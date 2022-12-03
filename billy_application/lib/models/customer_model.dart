class CustomerModel {
  String customerId;
  String customerName;
  String customerEmailID;
  String customerContact;

  CustomerModel({
    required this.customerId,
    required this.customerName,
    required this.customerEmailID,
    required this.customerContact,
  });

  factory CustomerModel.fromJson(Map<String, dynamic> json) {
    return CustomerModel(
      customerId: json['customerId'],
      customerName: json['customerName'],
      customerEmailID: json['customerEmailID'],
      customerContact: json['customerContact'].toString(),
    );
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data["customerName"] = customerName;
    data["customerEmailID"] = customerEmailID;
    data["customerContact"] = int.parse(customerContact);
    return data;
  }
}
