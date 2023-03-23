class ItemModel {
  bool? _status;
  late List<Data> _data;
  List<Data> get data => _data;

  ItemModel({required status, required data}) {
    _status = status;
    _data = data;
  }

  ItemModel.fromJson(Map<String, dynamic> json) {
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
  String? sId;
  List<Item>? item;

  Data({this.sId, this.item});

  Data.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    if (json['item'] != null) {
      item = <Item>[];
      json['item'].forEach((v) {
        item!.add(Item.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = sId;
    if (item != null) {
      data['item'] = item!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Item {
  String? sId;
  String? restaurant;
  Category? category;
  String? itemName;
  String? itemType;
  String? itemDescription;
  String? itemAddon;
  String? itemAddExtra;
  String? itemImage;
  bool? itemStatus;
  List<String>? variant;
  int? approvalStatus;
  String? createdAt;
  String? updatedAt;
  int? iV;

  Item(
      {this.sId,
      this.restaurant,
      this.category,
      this.itemName,
      this.itemType,
      this.itemDescription,
      this.itemAddon,
      this.itemAddExtra,
      this.itemImage,
      this.itemStatus,
      this.variant,
      this.approvalStatus,
      this.createdAt,
      this.updatedAt,
      this.iV});

  Item.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    restaurant = json['restaurant'];
    category =
        json['category'] != null ? Category.fromJson(json['category']) : null;
    itemName = json['itemName'];
    itemType = json['itemType'];
    itemDescription = json['itemDescription'];
    itemAddon = json['itemAddon'];
    itemAddExtra = json['itemAddExtra'];
    itemImage = json['itemImage'];
    itemStatus = json['itemStatus'];
    variant = json['variant'].cast<String>();
    approvalStatus = json['approvalStatus'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = sId;
    data['restaurant'] = restaurant;
    if (category != null) {
      data['category'] = category!.toJson();
    }
    data['itemName'] = itemName;
    data['itemType'] = itemType;
    data['itemDescription'] = itemDescription;
    data['itemAddon'] = itemAddon;
    data['itemAddExtra'] = itemAddExtra;
    data['itemImage'] = itemImage;
    data['itemStatus'] = itemStatus;
    data['variant'] = variant;
    data['approvalStatus'] = approvalStatus;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['__v'] = iV;
    return data;
  }
}

class Category {
  String? sId;
  String? restaurant;
  String? categoryName;
  bool? categoryStatus;
  int? approvalStatus;
  String? createdAt;
  String? updatedAt;
  int? iV;

  Category(
      {this.sId,
      this.restaurant,
      this.categoryName,
      this.categoryStatus,
      this.approvalStatus,
      this.createdAt,
      this.updatedAt,
      this.iV});

  Category.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    restaurant = json['restaurant'];
    categoryName = json['categoryName'];
    categoryStatus = json['categoryStatus'];
    approvalStatus = json['approvalStatus'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = sId;
    data['restaurant'] = restaurant;
    data['categoryName'] = categoryName;
    data['categoryStatus'] = categoryStatus;
    data['approvalStatus'] = approvalStatus;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['__v'] = iV;
    return data;
  }
}
