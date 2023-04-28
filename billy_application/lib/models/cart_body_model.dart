class CartBodyModel {
  String? customer;
  String? item;
  String? variant;
  String? addon;
  String? addextra;
  int? cartQty;
  int? cartPrice;

  CartBodyModel({
    this.customer,
    this.item,
    this.variant,
    this.addon,
    this.addextra,
    this.cartQty,
    this.cartPrice,
  });

  CartBodyModel.fromJson(Map<String, dynamic> json) {
    customer = json['customer'];
    item = json['item'];
    variant = json['variant'];
    addon = json['addon'];
    addextra = json['addextra'];
    cartQty = json['cartQty'];
    cartPrice = json['cartPrice'];
  }

  Map<String, dynamic> toJson() {
    return {
      'customer': customer,
      'item': item,
      'variant': variant,
      'addon': addon,
      'addextra': addextra,
      'cartQty': cartQty,
      'cartPrice': cartPrice
    };
  }
}
