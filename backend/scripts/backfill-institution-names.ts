import { PrismaClient } from '@prisma/client';
import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  CountryCode,
} from 'plaid';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

// Initialize Plaid client
const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

async function backfillInstitutionNames() {
  console.log('🔍 Finding accounts with missing institution names...\n');

  // Find all accounts with "Unknown" institution name
  const accountsToUpdate = await prisma.connectedAccount.findMany({
    where: {
      institutionName: 'Unknown',
      isActive: true,
    },
  });

  console.log(`Found ${accountsToUpdate.length} account(s) to update\n`);

  if (accountsToUpdate.length === 0) {
    console.log('✅ No accounts need updating!');
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  // Process each account
  for (const account of accountsToUpdate) {
    try {
      console.log(`📝 Processing account: ${account.id}`);

      if (!account.plaidAccessToken) {
        console.log('   ⚠️  No Plaid access token found, skipping...\n');
        errorCount++;
        continue;
      }

      let institutionId = account.institutionId;

      // If we don't have an institution ID, fetch it from Plaid
      if (!institutionId || institutionId === '') {
        console.log('   🔍 Fetching institution ID from Plaid...');
        const itemResponse = await plaidClient.itemGet({
          access_token: account.plaidAccessToken,
        });
        institutionId = itemResponse.data.item.institution_id || '';

        if (!institutionId) {
          console.log('   ⚠️  Could not retrieve institution ID from Plaid\n');
          errorCount++;
          continue;
        }
        console.log(`   Institution ID: ${institutionId}`);
      } else {
        console.log(`   Institution ID: ${institutionId}`);
      }

      // Fetch institution details from Plaid
      const institutionResponse = await plaidClient.institutionsGetById({
        institution_id: institutionId,
        country_codes: [CountryCode.Us],
      });

      const institutionName = institutionResponse.data.institution.name;

      // Update the account with both institution ID and name
      await prisma.connectedAccount.update({
        where: { id: account.id },
        data: {
          institutionId,
          institutionName,
        },
      });

      console.log(`   ✅ Updated to: "${institutionName}"\n`);
      successCount++;
    } catch (error: any) {
      console.error(`   ❌ Error updating account ${account.id}:`);
      console.error(`   ${error.message}\n`);
      errorCount++;
    }
  }

  // Summary
  console.log('═══════════════════════════════════════');
  console.log('📊 Migration Summary:');
  console.log(`   Total accounts processed: ${accountsToUpdate.length}`);
  console.log(`   ✅ Successfully updated: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log('═══════════════════════════════════════\n');
}

// Run the migration
backfillInstitutionNames()
  .then(() => {
    console.log('🎉 Migration complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
