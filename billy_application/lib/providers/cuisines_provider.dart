import 'package:billy_application/api/api_service.dart';
import 'package:billy_application/models/cuisines.dart';
import 'package:billy_application/models/pagination.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final cuisinesProvider =
    FutureProvider.family<List<Cuisines>?, PaginationModel>(
  (ref, paginationModel) {
    final apiRepository = ref.watch(apiService);

    return apiRepository.getCuisines(
      paginationModel.page,
      paginationModel.pageSize,
    );
  },
);
