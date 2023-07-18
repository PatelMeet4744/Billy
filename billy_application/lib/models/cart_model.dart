class CartModel {
  bool? _status;
  late List<Data> _data;
  List<Data> get data => _data;

  CartModel({required status, required data}) {
    _status = status;
    _data = data;
  }

  CartModel.fromJson(Map<String, dynamic> json) {
    _status = json['status'];
    if (json['data'] != null) {
      _data = <Data>[];
      json['data'].forEach((v) {
        data.add(Data.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['status'] = _status;
    data['data'] = this.data.map((v) => v.toJson()).toList();
    return data;
  }
}

class Data {
  String? customer;
  String? item;
  String? variant;
  List<String>? addon;
  List<String>? addextra;
  int? cartQty;
  int? cartPrice;
  String? createdAt;
  String? updatedAt;
  String? cartId;

  Data({
    this.customer,
    this.item,
    this.variant,
    this.addon,
    this.addextra,
    this.cartQty,
    this.cartPrice,
    this.createdAt,
    this.updatedAt,
    this.cartId,
  });

  Data.fromJson(Map<String, dynamic> json) {
    customer = json['customer'];
    item = json['item'];
    variant = json['variant'];
    addon = json['addon'].cast<String>();
    addextra = json['addextra'].cast<String>();
    cartQty = json['cartQty'];
    cartPrice = json['cartPrice'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    cartId = json['cartId'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['customer'] = customer;
    data['item'] = item;
    data['variant'] = variant;
    data['addon'] = addon;
    data['addextra'] = addextra;
    data['cartQty'] = cartQty;
    data['cartPrice'] = cartPrice;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['cartId'] = cartId;
    return data;
  }
}
