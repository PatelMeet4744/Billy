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
  int? total;
  List<Item>? item;

  Data({this.sId, this.total, this.item});

  Data.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    total = json['total'];
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
    data['total'] = total;
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
  String? itemImage;
  bool? itemStatus;
  List<Variant>? variant;
  int? approvalStatus;
  String? createdAt;
  String? updatedAt;
  Itemaddon? itemaddon;
  Itemaddextra? itemaddextra;

  Item(
      {this.sId,
      this.restaurant,
      this.category,
      this.itemName,
      this.itemType,
      this.itemDescription,
      this.itemImage,
      this.itemStatus,
      this.variant,
      this.approvalStatus,
      this.createdAt,
      this.updatedAt,
      this.itemaddon,
      this.itemaddextra});

  Item.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    restaurant = json['restaurant'];
    category =
        json['category'] != null ? Category.fromJson(json['category']) : null;
    itemName = json['itemName'];
    itemType = json['itemType'];
    itemDescription = json['itemDescription'];
    itemImage = json['itemImage'];
    itemStatus = json['itemStatus'];
    if (json['variant'] != null) {
      variant = <Variant>[];
      json['variant'].forEach((v) {
        variant!.add(Variant.fromJson(v));
      });
    }
    approvalStatus = json['approvalStatus'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    itemaddon = json['itemaddon'] != null
        ? Itemaddon.fromJson(json['itemaddon'])
        : null;
    itemaddextra = json['itemaddextra'] != null
        ? Itemaddextra.fromJson(json['itemaddextra'])
        : null;
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
    data['itemImage'] = itemImage;
    data['itemStatus'] = itemStatus;
    if (variant != null) {
      data['variant'] = variant!.map((v) => v.toJson()).toList();
    }
    data['approvalStatus'] = approvalStatus;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    if (itemaddon != null) {
      data['itemaddon'] = itemaddon!.toJson();
    }
    if (itemaddextra != null) {
      data['itemaddextra'] = itemaddextra!.toJson();
    }
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

class Variant {
  String? sId;
  String? variantName;
  String? variantuom;
  int? variantPrice;
  int? variantSalesPrice;
  bool? variantStatus;
  String? createdAt;
  String? updatedAt;
  int? iV;
  String? restaurant;

  Variant(
      {this.sId,
      this.variantName,
      this.variantuom,
      this.variantPrice,
      this.variantSalesPrice,
      this.variantStatus,
      this.createdAt,
      this.updatedAt,
      this.iV,
      this.restaurant});

  Variant.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    variantName = json['variantName'];
    variantuom = json['variantuom'];
    variantPrice = json['variantPrice'];
    variantSalesPrice = json['variantSalesPrice'];
    variantStatus = json['variantStatus'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
    restaurant = json['restaurant'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = sId;
    data['variantName'] = variantName;
    data['variantuom'] = variantuom;
    data['variantPrice'] = variantPrice;
    data['variantSalesPrice'] = variantSalesPrice;
    data['variantStatus'] = variantStatus;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['__v'] = iV;
    data['restaurant'] = restaurant;
    return data;
  }
}

class Itemaddon {
  String? sId;
  String? title;
  String? customerSelection;
  List<Addon>? addon;
  String? createdAt;
  String? updatedAt;
  int? iV;

  Itemaddon(
      {this.sId,
      this.title,
      this.customerSelection,
      this.addon,
      this.createdAt,
      this.updatedAt,
      this.iV});

  Itemaddon.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    title = json['title'];
    customerSelection = json['customerSelection'];
    if (json['addon'] != null) {
      addon = <Addon>[];
      json['addon'].forEach((v) {
        addon!.add(Addon.fromJson(v));
      });
    }
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = sId;
    data['title'] = title;
    data['customerSelection'] = customerSelection;
    if (addon != null) {
      data['addon'] = addon!.map((v) => v.toJson()).toList();
    }
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['__v'] = iV;
    return data;
  }
}

class Addon {
  String? sId;
  String? restaurant;
  String? addonName;
  String? addonType;
  int? addonPrice;
  int? addonAdditionalPrice;
  int? addonFinalPrice;
  int? approvalStatus;
  bool? addonStatus;
  String? createdAt;
  String? updatedAt;
  int? iV;

  Addon(
      {this.sId,
      this.restaurant,
      this.addonName,
      this.addonType,
      this.addonPrice,
      this.addonAdditionalPrice,
      this.addonFinalPrice,
      this.approvalStatus,
      this.addonStatus,
      this.createdAt,
      this.updatedAt,
      this.iV});

  Addon.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    restaurant = json['restaurant'];
    addonName = json['addonName'];
    addonType = json['addonType'];
    addonPrice = json['addonPrice'];
    addonAdditionalPrice = json['addonAdditionalPrice'];
    addonFinalPrice = json['addonFinalPrice'];
    approvalStatus = json['approvalStatus'];
    addonStatus = json['addonStatus'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = sId;
    data['restaurant'] = restaurant;
    data['addonName'] = addonName;
    data['addonType'] = addonType;
    data['addonPrice'] = addonPrice;
    data['addonAdditionalPrice'] = addonAdditionalPrice;
    data['addonFinalPrice'] = addonFinalPrice;
    data['approvalStatus'] = approvalStatus;
    data['addonStatus'] = addonStatus;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['__v'] = iV;
    return data;
  }
}

class Itemaddextra {
  String? sId;
  String? title;
  String? customerSelection;
  List<Addextra>? addextra;
  String? createdAt;
  String? updatedAt;
  int? iV;

  Itemaddextra(
      {this.sId,
      this.title,
      this.customerSelection,
      this.addextra,
      this.createdAt,
      this.updatedAt,
      this.iV});

  Itemaddextra.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    title = json['title'];
    customerSelection = json['customerSelection'];
    if (json['addextra'] != null) {
      addextra = <Addextra>[];
      json['addextra'].forEach((v) {
        addextra!.add(Addextra.fromJson(v));
      });
    }
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = sId;
    data['title'] = title;
    data['customerSelection'] = customerSelection;
    if (addextra != null) {
      data['addextra'] = addextra!.map((v) => v.toJson()).toList();
    }
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['__v'] = iV;
    return data;
  }
}

class Addextra {
  String? sId;
  String? restaurant;
  String? addextraName;
  String? addextraType;
  int? addextraPrice;
  int? addextraAdditionalPrice;
  int? addextraFinalPrice;
  int? approvalStatus;
  bool? addextraStatus;
  String? createdAt;
  String? updatedAt;
  int? iV;

  Addextra(
      {this.sId,
      this.restaurant,
      this.addextraName,
      this.addextraType,
      this.addextraPrice,
      this.addextraAdditionalPrice,
      this.addextraFinalPrice,
      this.approvalStatus,
      this.addextraStatus,
      this.createdAt,
      this.updatedAt,
      this.iV});

  Addextra.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    restaurant = json['restaurant'];
    addextraName = json['addextraName'];
    addextraType = json['addextraType'];
    addextraPrice = json['addextraPrice'];
    addextraAdditionalPrice = json['addextraAdditionalPrice'];
    addextraFinalPrice = json['addextraFinalPrice'];
    approvalStatus = json['approvalStatus'];
    addextraStatus = json['addextraStatus'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = sId;
    data['restaurant'] = restaurant;
    data['addextraName'] = addextraName;
    data['addextraType'] = addextraType;
    data['addextraPrice'] = addextraPrice;
    data['addextraAdditionalPrice'] = addextraAdditionalPrice;
    data['addextraFinalPrice'] = addextraFinalPrice;
    data['approvalStatus'] = approvalStatus;
    data['addextraStatus'] = addextraStatus;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['__v'] = iV;
    return data;
  }
}
