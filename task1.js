let bankAccountBalance = 40000;
let totalAccountsInBank = {
       accountBalanceOfA: 10000,
       accountBalanceOfB: 2000,
       accountBalanceOfC: 2000,
};

function transfer(sender, receiver, amount) {
       const taxRate = 0.02;
       const taxAmount = amount * taxRate;
       const transferredAmount = amount - taxAmount;
       //bankAccountBalance += taxAmount;
       totalAccountsInBank[sender] -= amount;
       totalAccountsInBank[receiver] += transferredAmount;

       // Calculate holder tax amount
       const totalBalance = bankAccountBalance + Object.values(totalAccountsInBank).reduce((a, b) => a + b, 0);
       const holderTaxAmount = taxAmount * 0.6;
       for (let account in totalAccountsInBank) {
              const accountBalance = totalAccountsInBank[account];
              const percentageBalance = accountBalance / totalBalance * 100;
              const holderTax = holderTaxAmount * percentageBalance / 100;
              totalAccountsInBank[account] += holderTax;
       }

       // Log results
       console.log(`Amount transferred: $${transferredAmount}`);
       console.log(`Total tax charged: $${taxAmount}`);
       console.log(`Bank tax: $${taxAmount * 0.4}`);
       console.log(`Holder tax: $${holderTaxAmount}`);
       console.log(`Total balance in Bank's own account: $${bankAccountBalance + (taxAmount * 0.4)}`);

       // Distribute holder tax and log updated balances
       for (let account in totalAccountsInBank) {
              const accountBalance = totalAccountsInBank[account];
              const percentageBalance = accountBalance / totalBalance * 100;
              const holderTax = holderTaxAmount * percentageBalance / 100;
              totalAccountsInBank[account] += holderTax;
       }
       console.log('Balance after distributing holder tax:', totalAccountsInBank);

}

transfer('accountBalanceOfA', 'accountBalanceOfB', 1000);
