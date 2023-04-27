class CartBodyModel {
  String? customer;
  String? item;
  String? variant;
  String? addon;
  String? addextra;
  int? cartQty;
  int? cartPrice;
  bool? isExist;

  CartBodyModel({
    this.customer,
    this.item,
    this.variant,
    this.addon,
    this.addextra,
    this.cartQty,
    this.cartPrice,
    this.isExist,
  });

  // CartBodyModel.fromJson(Map<String, dynamic> json) {
  //   customer = json['customer'];
  //   item = json['item'];
  //   variant = json['variant'];
  //   addon = json['addon'].cast<String>();
  //   addextra = json['addextra'].cast<String>();
  //   cartQty = json['cartQty'];
  //   cartPrice = json['cartPrice'];
  //   isExist = json['isExist'];
  // }

  // Map<String, dynamic> toJson() {
  //   final Map<String, dynamic> data = <String, dynamic>{};
  //   data['customer'] = customer;
  //   data['item'] = item;
  //   data['variant'] = variant;
  //   data['addon'] = addon;
  //   data['addextra'] = addextra;
  //   data['cartQty'] = cartQty;
  //   data['cartPrice'] = cartPrice;
  //   data['isExist'] = isExist;
  //   return data;
  // }
}
