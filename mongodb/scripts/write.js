var txs = []
for (var x = 0; x < 1000 ; x++) {
 var transaction_types = ["credit card", "cash", "account"];
 var store_names = ["edgards", "cna", "makro", "picknpay", "checkers"];
 var random_transaction_type = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
 var random_store_name = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
 txs.push({
   transaction: 'tx_' + x,
   transaction_price: Math.round(Math.random()*1000),
   transaction_type: transaction_types[random_transaction_type],
   store_name: store_names[random_store_name]
   });
}
db.mycollection.insert(txs)
