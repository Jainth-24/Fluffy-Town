const fa: { [key: string]: string } = {
  mainPage: 'صفحه اصلی ZiShop',
  search: 'جستجو',
  login: 'ورود',
  signIn: 'ثبت‌نام',
  logout: 'خروج',
  favorites: 'علاقه‌مندی‌ها',
  delete: 'حذف',
  thereAreNoFavorites: 'در حال حاضر، هیچ آیتم مورد علاقه وجود ندارد.',
  seeCart: 'مشاهدۀ سبد خرید',
  product: 'کالا',
  totalAmount: 'قیمت کل',
  totalQuantity: 'تعداد کل کالا‌ها',
  payableAmount: 'مبلغ قابل پرداخت',
  loginAndOrder: 'ورود و ثبت سفارش',
  order: 'ثبت سفارش',
  orderSummary: 'خلاصه سفارش',
  cartIsEmpty: 'سبد خرید شما خالی است',
  language: 'انتخاب زبان:',
  fa: 'فارسی - Fa',
  en: 'En - English',
  theme: 'انتخاب تم: ',
  dark: 'تیره',
  light: 'روشن',
  CategoryOfGoods: 'دسته‌بندی کالا‌ها',
  categories: 'دسته‌بندی‌ها',
  seeAllProduct: 'دیدن تمام محصولات این دسته',
  offer: 'پیشنهادات و تخفیف‌های ویژه',
  bestSells: 'پرفروش‌ترین‌ها',
  mainMenu: 'منو‌ی اصلی',
  digital: 'کالای دیجیتال',
  laptop: 'لپ تاپ و لوازم جانبی',
  asus: 'ایسوس',
  apple: 'اپل',
  dell: 'دل',
  lenovo: 'لنوو',
  samsung: 'سامسونگ',
  hp: 'اچ پی',
  huawei: 'هوآوی',
  acer: 'ایسر',
  msi: 'ام اس آی',
  mobile: 'گوشی موبایل و لوازم جانبی',
  nokia: 'نوکیا',
  xiaomi: 'شیائومی',
  motorola: 'موتورلا',
  lg: 'ال جی',
  sony: 'سونی',
  computer: 'کامپیوتر و لوازم جانبی',
  monitor: 'مانیتور',
  mouse: 'ماوس',
  keyboard: 'کیبورد',
  hard: 'هارد، فلش و SSD',
  other: 'موارد دیگر',
  tablet: 'تبلت',
  powerBank: 'پاور بانک',
  speaker: 'اسپیکر بلوتوث و با سیم',
  headphones: 'هدفون، هدست و هندزفری',
  fashion: 'مد و پوشاک',
  women: 'پوشاک و لوازم زنانه',
  dress: 'لباس زنانه',
  skirt: 'دامن',
  jeans: 'شلوار لی',
  pants: 'شلوار',
  tShirt: 'تیشرت',
  scarf: 'شال و روسری',
  shirt: 'پیراهن',
  tie: 'کراوات',
  overalls: 'لباس سرهمی',
  mittens: 'دستکش',
  babyApron: 'پیشبند کودک',
  shoes: 'کفش',
  watch: 'ساعت',
  wallet: 'کیف پول',
  hat: 'کلاه',
  belt: 'کمربند',
  men: 'پوشاک و لوازم مردانه',
  child: 'پوشاک و لوازم بچه‌گانه',
  toys: 'اسباب بازی، کودک و نوزاد',
  cosmetic: 'آرایشی و بهداشتی',
  home: 'لوازم خانه و آشپز خانه',
  sport: 'ورزش و سفر',
  stationery: 'کتاب، لوازم تحریر و هنر',
  noProduct: 'هنوز هیچ محصولی در این دسته وجود ندارد. محصولات جدید به زودی اضافه خواهند شد.',
  digitalBT: 'درک بهترین تجربه',
  digitalBD:
    'ما بهترین تجربه را با محبوب ترین برند ها ارائه می دهیم. با گارانتی 18 ماهه می توانید از انتخاب خود مطمئن باشید',
  stationeryBT: 'تنوع در انتخاب',
  stationeryBD:
    'وقتی صحبت از زیبایی و کارایی می شود. ارائه زیباترین و مرغوبترین لوازم تحریر و ست‌های اداری، با قیمت مناسب.',
  toyBT: 'سرگرمی و رشد خلاقیت',
  toyBD: 'بهترین اسباب‌بازی‌ها برای سرگرمی و رشد خلاقیت، محصولاتی با بهترین کیفیت و ضد حساسیت برای خلق لحظات شاد',
  houseBT: 'خانۀ مدرن',
  houseBD:
    'با محصولاتی که بر اساس جدیدترین و برجسته ترین سبک ها طراحی شده اند، از لحظات زیبای رضایت و آرامش در کنار عزیزان خود در خانه لذت ببرید.',
  fashionBT: 'زیبایی و راحتی',
  fashionBD:
    'بهترین پارچه ها، بروزترین طرح ها و محبوب ترین برندها را با قیمت های مناسب پیدا خواهید کرد. بهترین ظاهر خود را داشته باشید و در میان جمعیت متمایز شوید.',
  beautyBT: 'مرغوبترین و مطرح‌ترین برندها',
  beautyBD:
    'بدون آلرژی، افراد با انواع پوست می توانند محصولات مورد نیاز خود را پیدا کنند. تایید شده توسط سازمان بهداشت جهانی، محصولاتی از برندهای معتبر جهانی.',
  deliver: 'تحویل سریع',
  cash: 'پرداخت در محل',
  support: 'پشتیبانی ۲۴/۷',
  warrantyBenefit: 'ضمانت اصل بودن کالا',
  return: 'هفت روز ضمانت بازگشت کالا',
  offers: 'پیشنهادات ویژه',
  newest: 'جدیدترین کالا‌ها',
  seeAll: 'دیدن همه',
  specialSale: 'فروش ویژه',
  seeAllNewProducts: 'دیدن تمام محصولات جدید',
  digitalCategoryTitle: 'محصولات دیجیتال',
  digitalCategoryDescription: 'به‌روزترین محصولات با مناسب‌ترین قیمت',
  fashionCategoryTitle: 'مد و پوشاک',
  fashionCategoryDescription: 'محبوب‌ترین برندها با مناسب‌ترین قیمت',
  beautyCategoryTitle: 'آرایشی و بهداشتی',
  beautyCategoryDescription: 'محصولات ضد حساسیت مناسب انواع پوست از برندهای معتبر',
  sportCategoryTitle: 'ورزش و سفر',
  sportCategoryDescription: 'محصولات مرغوب و مقاوم',
  houseCategoryTitle: 'خانه و آشپزخانه',
  houseCategoryDescription: 'مطابق با طراحی‌های روز دنیا',
  toyCategoryTitle: 'اسباب‌بازی، کودک و نوزاد',
  toyCategoryDescription: 'سرگرمی در کنار پرورش خلاقیت',
  stationeryCategoryTitle: 'کتاب، لوازم تحریر و هنر',
  stationeryCategoryDescription: 'تنوع در انتخاب',
  seeAllProducts: 'دیدن همه محصولات',
  expireDiscount: 'مدت زمان تخفیف برای این محصول به پایان رسیده.',
  days: 'روز',
  hours: 'ساعت',
  mins: 'دقیقه',
  seconds: 'ثانیه',
  larisaTitle: 'مبلمان لاریسا',
  larisaDescription: 'مبل زیبای لاریسا با طراحی به خصوصی خود می تواند زیبایی بی نظیری به دکوراسیون پذیرایی شما ببخشد.',
  byNow: 'اضافه به سبد خرید',
  see: 'مشاهده محصول',
  romanoTitle: 'مبلمان رومانو',
  romanoDescription: 'مبل راحتی رومانو زیبایی چشم گیری دارد و می تواند جذابیت دکوراسیون منزل شما را چند برابر کند.',
  popularBrands: 'برندهای محبوب',
  zishopMap: 'نقشه Zishop',
  aboutUs: 'دربارۀ ما',
  contactUs: 'تماس با ما',
  saleInZishop: 'فروش در Zishop',
  careerOpportunities: 'فرصت‌های شغلی',
  customerServices: 'خدمات مشتریان',
  commonQuestions: 'سؤالات متداول',
  returnProcedures: 'رویۀ بازگرداندن کالا',
  privacy: 'حریم خصوصی',
  shoppingGuide: 'راهنمای خرید',
  howToPlaceAnOrder: 'نحوۀ ثبت سفارش',
  orderSubmissionProcedure: 'رویۀ ارسال سفارش',
  paymentMethods: 'شیوه‌های پرداخت',
  beWithUs: 'همراه ما باشید!',
  emailRegister: 'با ثبت ایمیل، از جدید‌ترین تخفیف‌ها با‌خبر شوید',
  yourEmail: 'لطفاً ایمیل خود را وارد کنید',
  register: 'ثبت',
  copyRight: ' © تمام حقوق این سایت محفوظ است - طراحی و توسعه با',
  sort: 'مرتب‌سازی: ',
  all: 'همه',
  newestProducts: 'جدیدترین',
  cheapest: 'ارزان‌ترین',
  popular: 'محبوب‌ترین',
  expensive: 'گران‌ترین',
  details: 'جزئیات محصول',
  back_camera: 'دوربین اصلی',
  battery: 'باطری',
  front_camera: 'دوربین جلو',
  operating_system: 'سیستم عامل',
  processor: 'پردازنده',
  ram: 'حافظه داخلی',
  screen: 'صفحه نمایش',

  resolution: 'رزولوشن',
  display_type: 'نوع صفحه‌نمایش',
  viewing_angle: 'زاویه دید',
  response_time: 'زمان پاسخگویی',
  refresh_rate: 'نرخ تازه‌سازی',
  panel_technology: 'فناوری پنل',
  input_output_types: 'انواع ورودی/خروجی',

  true: 'بله',
  false: 'خیر',
  bluetooth: 'بلوتوث',
  frequency_response: 'پاسخ فرکانس',
  sound_isolating: 'عایق صدا',
  microphone: 'میکروفن',
  noise_cancelling: 'قابلیت حذف نویز',
  wireless: 'بی‌سیم',
  wireless_standby_time: 'عمر باتری در حالت استندبای',
  connectionType: 'نوع اتصال',
  connectors: 'رابط‌ها',

  multimedia_keys: 'کلیدهای چندرسانه‌ای',
  number_of_buttons: 'تعداد دکمه‌ها(شامل Scroll Wheel)',
  width: 'عرض',
  height: 'ارتفاع',
  depth: 'عمق',
  curved: 'منحنی',
  built_in_speakers: 'بلندگوهای داخلی',
  mechanical_keys: 'کلیدهای مکانیکی',
  backlit_keys: 'کلیدهای دارای نور پس‌زمینه',
  ergonomic_design: 'طراحی ارگونومیک',
  designed_for_gaming: 'طراحی شده برای بازی',

  graphic: 'کارت گرافیک',
  ports: 'پورت‌ها',
  ssd: 'هارد SSD ',
  warranty: 'گارانتی',
  addToCart: 'اضافه به سبد خرید',
  stars: 'ستاره',
  price: 'قیمت محصول',
  similarProducts: 'ممکن است علاقه‌مند باشید',
  cart: 'سبد خرید',
  hi: 'سلام!',
  loginExplanation:
    '.برای بررسی قالب میتونید علاوه بر ثبت‌نام از اطلاعات اکانت تست هم استفاده کنید(نام کاربری:test@info.com - رمز عبور:123456)',
  testAccount: 'اکانت test',
  userName: 'نام کاربری',
  password: 'رمز عبور',
  email: 'ایمیل',
  enterYourUserName: 'لطفاً نام کاربری خود را وارد کنید',
  enterYourPassword: 'لطفاً رمز عبور خود را وارد کنید',
  enterYourEmail: 'لطفاً ایمیل خود را وارد کنید',
  doHaveAnAccount: 'هنوز حساب کاربری ندارید؟ ',
  alreadyHaveAnAccount: 'حساب کاربری دارید؟ ',
  signUp: 'ثبت‌نام',
  Invalid_email_or_password: 'ایمیل یا رمزعبور اشتباه است.',
  Email_already_exists: 'در حال حاضر این ایمیل وجود دارد',
  aboutLongText:
    'قالب فروشگاه ZShop جهت تثبیت دانش front-end بنده، با استفاده از تکنولوژی‌هایی نظیر Nextjs, TypeScript, Reactjs, TailwindCSS و ... به عنوان نمونه کار ، نوشته شده. از CafeDX و البته مهندس سید مهدی حسن‌پور، بابت تمام حمایت‌ها و نظراتشون از صمیم قلب سپاسگزارم.',
  aboutEnjoy: 'امیدوارم از تماشا و کار با این قالب لذت ببرید.',
  myName: 'زهرا میرزایی',
  cafeDX: 'کار برای بهبود زندگی است نه برعکس.',
  productAddedToCartMsg: 'محصول با موفقیت به سبد خرید اضافه شد',
};
export default fa;
