class SignUpBody {
  String customerName;
  String customerEmailID;
  String customerPassword;
  String customerContact;

  SignUpBody({
    required this.customerName,
    required this.customerEmailID,
    required this.customerPassword,
    required this.customerContact,
  });

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data["customerName"] = customerName;
    data["customerEmailID"] = customerEmailID;
    data["customerPassword"] = customerPassword;
    data["customerContact"] = int.parse(customerContact);
    return data;
  }
}
