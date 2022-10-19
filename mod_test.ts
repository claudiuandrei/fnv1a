import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import fnv1a from "./mod.ts";

Deno.test("default", () => {
	// Test 32-bit for various strings
	assertEquals(fnv1a(""), 2_166_136_261n);
	assertEquals(fnv1a("h"), 3_977_000_791n);
	assertEquals(fnv1a("he"), 1_547_363_254n);
	assertEquals(fnv1a("hel"), 179_613_742n);
	assertEquals(fnv1a("hell"), 477_198_310n);
	assertEquals(fnv1a("hello"), 1_335_831_723n);
	assertEquals(fnv1a("hello "), 3_801_292_497n);
	assertEquals(fnv1a("hello w"), 1_402_552_146n);
	assertEquals(fnv1a("hello wo"), 3_611_200_775n);
	assertEquals(fnv1a("hello wor"), 1_282_977_583n);
	assertEquals(fnv1a("hello worl"), 2_767_971_961n);
	assertEquals(fnv1a("hello world"), 3_582_672_807n);

	// Bigger test
	assertEquals(
		fnv1a(
			"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium."
		),
		2_964_896_417n
	);
});

Deno.test("unicode handling", () => {
	assertEquals(fnv1a("🦄🌈"), 2_868_248_295n);
	assertEquals(
		fnv1a(
			"\u{0000}\u{0080}\u{0100}\u{0180}\u{0250}\u{02B0}\u{0300}\u{0370}\u{0400}\u{0500}\u{0530}\u{0590}\u{0600}\u{0700}\u{0780}\u{0900}\u{0980}\u{0A00}\u{0A80}\u{0B00}\u{0B80}\u{0C00}\u{0C80}\u{0D00}\u{0D80}\u{0E00}\u{0E80}\u{0F00}\u{1000}\u{10A0}\u{1100}\u{1200}\u{13A0}\u{1400}\u{1680}\u{16A0}\u{1700}\u{1720}\u{1740}\u{1760}\u{1780}\u{1800}\u{1900}\u{1950}\u{19E0}\u{1D00}\u{1E00}\u{1F00}\u{2000}\u{2070}\u{20A0}\u{20D0}\u{2100}\u{2150}\u{2190}\u{2200}\u{2300}\u{2400}\u{2440}\u{2460}\u{2500}\u{2580}\u{25A0}\u{2600}\u{2700}\u{27C0}\u{27F0}\u{2800}\u{2900}\u{2980}\u{2A00}\u{2B00}\u{2E80}\u{2F00}\u{2FF0}\u{3000}\u{3040}\u{30A0}\u{3100}\u{3130}\u{3190}\u{31A0}\u{31F0}\u{3200}\u{3300}\u{3400}\u{4DC0}\u{4E00}\u{A000}\u{A490}\u{AC00}\u{D800}\u{DC00}\u{E000}\u{F900}\u{FB00}\u{FB50}\u{FE00}\u{FE20}\u{FE30}\u{FE50}\u{FE70}\u{FF00}\u{FFF0}\u{10000}\u{10080}\u{10100}\u{10300}\u{10330}\u{10380}\u{10400}\u{10450}\u{10480}\u{10800}\u{1D000}\u{1D100}\u{1D300}\u{1D400}\u{20000}\u{2F800}\u{E0000}\u{E0100}"
		),
		2_554_322_693n
	);
});

Deno.test("32-bit", () => {
	assertEquals(fnv1a("", { size: 32 }), 2_166_136_261n);
	assertEquals(fnv1a("hello", { size: 32 }), 1_335_831_723n);
	assertEquals(fnv1a("hello world", { size: 32 }), 3_582_672_807n);
});

Deno.test("64-bit", () => {
	assertEquals(fnv1a("", { size: 64 }), 14_695_981_039_346_656_037n);
	assertEquals(fnv1a("hello", { size: 64 }), 11_831_194_018_420_276_491n);
	assertEquals(fnv1a("hello world", { size: 64 }), 8_618_312_879_776_256_743n);
});

Deno.test("128-bit", () => {
	assertEquals(
		fnv1a("", { size: 128 }),
		144_066_263_297_769_815_596_495_629_667_062_367_629n
	);
	assertEquals(
		fnv1a("hello", { size: 128 }),
		302_907_886_228_425_533_802_623_465_673_358_913_971n
	);
	assertEquals(
		fnv1a("hello world", { size: 128 }),
		143_667_438_548_887_148_232_425_432_707_801_491_127n
	);
});

Deno.test("256-bit", () => {
	assertEquals(
		fnv1a("", { size: 256 }),
		100_029_257_958_052_580_907_070_968_620_625_704_837_092_796_014_241_193_945_225_284_501_741_471_925_557n
	);
	assertEquals(
		fnv1a("hello", { size: 256 }),
		24_621_739_307_028_566_391_642_840_221_992_687_346_817_534_817_626_804_975_463_790_541_119_213_691_899n
	);
	assertEquals(
		fnv1a("hello world", { size: 256 }),
		107_091_797_346_500_423_043_575_108_682_219_024_833_276_789_533_882_915_251_308_540_790_054_288_114_983n
	);
});

Deno.test("512-bit", () => {
	assertEquals(
		fnv1a("", { size: 512 }),
		9_659_303_129_496_669_498_009_435_400_716_310_466_090_418_745_672_637_896_108_374_329_434_462_657_994_582_932_197_716_438_449_813_051_892_206_539_805_784_495_328_239_340_083_876_191_928_701_583_869_517_785n
	);
	assertEquals(
		fnv1a("hello", { size: 512 }),
		7_892_563_648_106_928_388_641_744_747_901_962_995_816_211_260_805_030_760_135_011_933_811_709_338_702_442_123_338_016_979_459_597_105_834_714_497_783_048_560_046_644_182_143_206_509_375_819_400_532_849_111n
	);
	assertEquals(
		fnv1a("hello world", { size: 512 }),
		2_284_029_013_641_389_081_834_419_821_678_833_770_628_458_656_170_256_635_031_087_663_449_512_080_707_767_615_593_291_542_658_598_229_555_444_082_872_593_184_965_938_618_627_164_785_141_330_455_595_113_999n
	);
});

Deno.test("1024-bit", () => {
	assertEquals(
		fnv1a("", { size: 1024 }),
		14_197_795_064_947_621_068_722_070_641_403_218_320_880_622_795_441_933_960_878_474_914_617_582_723_252_296_732_303_717_722_150_864_096_521_202_355_549_365_628_174_669_108_571_814_760_471_015_076_148_029_755_969_804_077_320_157_692_458_563_003_215_304_957_150_157_403_644_460_363_550_505_412_711_285_966_361_610_267_868_082_893_823_963_790_439_336_411_086_884_584_107_735_010_676_915n
	);
	assertEquals(
		fnv1a("hello", { size: 1024 }),
		162_599_568_807_828_018_278_740_454_090_851_618_076_261_791_243_547_429_330_845_926_617_440_124_701_815_376_483_262_958_546_407_611_470_083_720_486_420_160_817_850_263_303_428_987_405_974_668_389_046_941_240_548_898_833_919_126_704_680_456_253_506_816_487_407_186_600_714_845_619_389_901_326_326_498_663_678_676_823_405_702_541_932_736_634_507_371_229_190_999_806_123_793_839_783_784_715_844_873_833n
	);
	assertEquals(
		fnv1a("hello world", { size: 1024 }),
		44_705_935_654_141_004_193_995_617_877_036_239_954_733_433_467_987_873_110_224_072_050_244_340_907_292_522_365_820_412_193_858_445_161_665_446_294_825_421_372_819_542_910_915_471_013_433_687_867_782_180_376_165_625_451_113_035_481_518_665_896_563_620_971_904_987_624_930_607_920_254_296_854_636_148_526_204_223_268_570_335_218_685_421_013_388_560_424_369_170_244_435_379_864_974_005_188_041_151_940_650_099_055n
	);
});
