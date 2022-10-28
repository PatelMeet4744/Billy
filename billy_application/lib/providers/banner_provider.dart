import 'package:billy_application/api/api_service.dart';
import 'package:billy_application/models/bannerResponse.dart';
import 'package:billy_application/models/pagination.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final bannerProvider = FutureProvider.family<BannerResponse?, PaginationModel>(
  (ref, paginationModel) {
    final sliderRepo = ref.watch(apiService);

    return sliderRepo.getBannerResponse(
      paginationModel.page,
      paginationModel.pageSize,
    );
  },
);
