import 'package:billy_application/models/item_model.dart';

class TempModel {
  List<Item>? itemList;
  int? index;
  int? variant;
  List<int>? selectedItemAddonList;
  List<int>? selectedItemAddExtraList;
  int? qty;
  int? totalPrice;

  TempModel(
    this.itemList,
    this.index,
    this.variant,
    this.selectedItemAddonList,
    this.selectedItemAddExtraList,
    this.qty,
    this.totalPrice,
  );
}
