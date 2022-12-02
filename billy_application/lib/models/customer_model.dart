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
}
