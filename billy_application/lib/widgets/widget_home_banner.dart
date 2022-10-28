import 'package:billy_application/models/bannerResponse.dart';
import 'package:billy_application/models/pagination.dart';
import 'package:billy_application/providers/banner_provider.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class HomeBannerWidget extends ConsumerWidget {
  const HomeBannerWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      color: Colors.white,
      child: _bannerList(context, ref),
    );
  }

  Widget _bannerList(BuildContext context, WidgetRef ref) {
    final banners = ref.watch(
      bannerProvider(
        PaginationModel(page: 1, pageSize: 10),
      ),
    );
    return banners.when(
      data: (list) => imageCarousel(list!),
      error: (_, __) => const Center(
        child: Text("ERROR"),
      ),
      loading: () => const Center(
        child: CircularProgressIndicator(),
      ),
    );
  }

  Widget imageCarousel(BannerResponse bannerList) {
    return CarouselSlider(
      items: bannerList.data?.map((model) {
        return Container(
          margin: const EdgeInsets.all(6.0),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8.0),
            image: DecorationImage(
              image: NetworkImage(model.bannerImage),
              fit: BoxFit.cover,
            ),
          ),
        );
      }).toList(),
      options: CarouselOptions(
        height: 180.0,
        enlargeCenterPage: true,
        autoPlay: true,
        aspectRatio: 16 / 9,
        autoPlayCurve: Curves.fastOutSlowIn,
        enableInfiniteScroll: true,
        autoPlayAnimationDuration: const Duration(milliseconds: 800),
      ),
    );
  }
}
