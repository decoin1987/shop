<script lang="ts" setup>
import {ref} from "vue";
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
} from 'vue-yandex-maps';
import type {YMapLocationRequest} from '@yandex/ymaps3-types/imperative/YMap';
import Flicking from "@egjs/vue3-flicking";


const bouquetName =
    [
      "Романтический подарок",
      "Символ любви",
      "Признание в чувствах",
      "Романтическая композиция",
      "Сердце из цветов",
      "Романтический сюрприз",
      "Признание в любви",
      "Романтический жест",
      "Романтическая атмосфера",
      "Романтическое настроение"
    ]
const products =
    [
      {
        "id": "46f4362c-5986-4aea-94e3-195834a13568",
        "title": "Fantastic Fresh Gloves",
        "price": 3378,
        "sale": 12,
        "club": 11,
        "url": "https://roots-store.ru/upload/images/products/o/e26ef0dad65fde2b512300bd3b92f697_webp.webp"
      },
      {
        "id": "8873a091-31a7-43b2-800b-6c1d0a08315f",
        "title": "Sleek Granite Gloves",
        "price": 6458,
        "sale": '',
        "club": 3,
        "url": "https://roots-store.ru/upload/images/products/o/11fcf69613f97487d3b43a9ceab1d4c0.jpg"
      },
      {
        "id": "236960b5-85d2-4023-a666-efecd2955e6b",
        "title": "Generic Concrete Car",
        "price": 7322,
        "sale": 18,
        "club": 12,
        "url": "https://roots-store.ru/upload/images/products/o/b626aaaf3078be914e8e65326224ca19.jpg"
      },
      {
        "id": "e8e468c1-14c3-41c6-9fa6-c94b79b2b813",
        "title": "Small Cotton Chair",
        "price": 7500,
        "sale": 24,
        "club": 12,
        "url": "https://букет72.рф/image/cache/catalog/111/dblkl./lavfdswxqka-900x900.jpg"
      },
      {
        "id": "a9201d1f-6b85-4a7c-97a5-169069086806",
        "title": "Handcrafted Granite Computer",
        "price": 7117,
        "sale": 11,
        "club": 8,
        "url": "https://www.odealarose.com/media/cache/720_960_webp/product/phpEZE3lX-64c3ddf515a1b.webp"
      },
      {
        "id": "d8b3ad3d-4683-4958-be11-eb54e71ab3a8",
        "title": "Oriental Bronze Soap",
        "price": 5710,
        "sale": 23,
        "club": 11,
        "url": "https://www.odealarose.com/media/cache/720_960_webp/product/phpEZE3lX-64c3ddf515a1b.webp"
      },
      {
        "id": "1d5d7d30-e52f-46d1-a1fa-f7891cd5ed5f",
        "title": "Recycled Plastic Chips",
        "price": 2742,
        "sale": 14,
        "club": 0,
        "url": "https://www.odealarose.com/media/cache/720_960_webp/product/phpEZE3lX-64c3ddf515a1b.webp"
      },
      {
        "id": "9dfe5870-5a05-4586-8b98-8f9cb0cab20a",
        "title": "Tasty Fresh Chips",
        "price": 7235,
        "sale": 9,
        "club": 6,
        "url": "https://www.odealarose.com/media/cache/720_960_webp/product/phpEZE3lX-64c3ddf515a1b.webp"
      },
      {
        "id": "c3affa47-7740-43d1-8990-403af50dadbe",
        "title": "Sleek Granite Chicken",
        "price": 3673,
        "sale": 8,
        "club": 11,
        "url": "https://www.odealarose.com/media/cache/720_960_webp/product/phpEZE3lX-64c3ddf515a1b.webp"
      },
      {
        "id": "b7280e81-8bed-44fe-9096-ec6195499750",
        "title": "Generic Plastic Salad",
        "price": 4035,
        "sale": 20,
        "club": 3,
        "url": "https://www.odealarose.com/media/cache/720_960_webp/product/phpEZE3lX-64c3ddf515a1b.webp"
      }
    ]

const catalogPresents = [
  'День рождения', 'Годовщина', 'Поздравления', 'Поправляйся', 'Симпатия', 'Рождение ребенка', 'Свадьба'
]
const showSaleDescription = () => {
  console.log('salemodaldescription')
}
const bouquetNameMap = () => {
  products.map((el, index) => {
    el.title = bouquetName[index]
  })
}

bouquetNameMap()

const cartStore = useCartStore()
const productStore = useProductStore()

const LOCATION = ref<YMapLocationRequest>({
  center: [65.578139, 57.106595],
  zoom: 19,
});
const mapSettings = ref({
  location: LOCATION,
})
const options = {
  preventClickOnDrag: true,
  moveType: 'snap',
  align: 'center',
  threshold: 80,
  iOSEdgeSwipeThreshold: 30,
  circular: false,
  adaptive: false,
  circularFallback: 'bound',
  bound: true,
  renderOnlyVisible: true,
  preventDefaultOnDrag: true,
}
</script>

<template>
  <UContainer class="w-full">
    <Stories class="mb-14"/>

    <section class="mb-14">
      <h1 class="p-0 m-0 text-5xl mb-6">Витрина</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <Card
            v-for="product in productStore.products.rows"
            :key="product.id"
            @showSaleDescription="showSaleDescription"
            :product="product"
            @addToCart="cartStore.addToCart"
        />
      </div>
      <UButton>Смотреть всё</UButton>
    </section>

    <section class="bg-red-50 p-10 mb-14 rounded-lg">
      <h1 class="p-0 text-5xl mb-8">Букеты на любой случай</h1>
      <div class="flex gap-5 flex-wrap">
        <UButton v-for="item in catalogPresents" size="lg" :ui="{ rounded: 'rounded-full' }" color="red"
                 variant="solid">{{ item }}
        </UButton>
      </div>
    </section>

    <section class="mb-14">
      <h1 class="p-0 mb-2 text-5xl">Авторские букеты</h1>
      <p class="mb-6">Букеты под заказ от наших флористов</p>
      <div class="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <Card
            v-for="p in products.slice(0, 4)"
            :key="p.id"
            @showSaleDescription="showSaleDescription"
            :product="p"
        />
      </div>
      <UButton>Смотреть всё</UButton>
    </section>

    <section class="mb-14">
      <div class="flex  flex-wrap gap-3">
        <article class="">
          <h1 class="text-3xl">
            Доставка от часа
          </h1>
        </article>
        <article class="">
          <h1 class="text-3xl">Свежие цветы</h1>
        </article>
        <article class="">
          <h1 class="text-3xl">Фирменная упаковка</h1>
        </article>
        <article class="">
          <h1 class="text-3xl">Фото букета до отправки</h1>
        </article>
      </div>
    </section>
  </UContainer>
  <div class="bg-gray-100 pt-14 mb-14">
    <UContainer>
      <section class="mb-14">
        <h1 class="p-0 m-0 text-5xl mb-6">О нас говорят</h1>
        <Flicking :options="options">
          <ReviewCard v-for="i in 8" :key="i" />
        </Flicking>
      </section>
    </UContainer>
  </div>
  <UContainer>
    <section class="mb-14 flex  flex-wrap">
      <h1 class="text-3xl mb-6">Доставка цветов в Тюмени</h1>
      <div class="flex flex-wrap gap-10">
        <div class="flex flex-wrap" style="flex: 1 1">
          <p style="margin-bottom: 10px">
            На нашем сайте вы можете заказать цветочные букеты домой или в офис в Тюмени от цветочной мастерской
            "букет72.рф" Наши букеты всегда свежие. Мы гордимся тем, что делаем, мы рады приносить счастье вашим
            родным и близким. Мы всегда рады вашим отзывам и предложениям!
          </p>
          <p style="margin-bottom: 10px">
            Наши специалисты очень бережно относятся к своим цветам и ревностно следят за правильным хранением и
            оформлением букетов. Поэтому мы всегда уверены в качестве букетов и даем своим клиентам гарантию на любой
            букет. Наша круглосуточная служба доставки оперативно доставляет букеты по городу и пригороду.
          </p>
          <p style="margin-bottom: 10px">
            Наши букеты содержат все самые полюбившиеся цветы: тюльпаны, лилии, гвоздики, хризантемы и конечно же
            розы, классические и кустовые. Помимо "классических" букетов, мы готовы порадовать самых изысканных
            любителей букетами с альстромерией, солигадо, статица, гипсофила и многие другие. Подробную информацию о
            всех возможных букетах вы можете найти в нашем каталоге.
          </p>
          <p style="margin-bottom: 10px">
            Помимо цветочных букетов мы создаем потрясающие композиции для подарков в коробках. В таких подарочных
            наборах цветы миксуются с лучшими конфетами или свежими ягодами/фруктами. В нашем каталоге вы сможете
            найти их в разделе "Цветы в коробке, корзине, кашпо". Для сладкоежек у нас есть особенные подарки -
            композиции только из разнообразных любимых сладостей. Такой подарок оставит светлые и яркие эмоции на
            долгое время. Не будем скромничать - наши клиенты часто делятся своими красивыми подарками в инстаграме,
            будем рады и вашим отзывам! ;)
          </p>
          <p style="margin-bottom: 10px">
            Мы не обошли вниманием и мужчин. Для них у нас есть эксклюзивные букеты состоящие из кофейных, сувенирных
            букетов, для любителей пива и мяса имеются букеты с отборной колбаской и снеками, и конечно венцом такого
            букета может быть бутылка отличного виски или крафтового пива. С этими букетами вы легко удивите вашего
            мужа, брата или даже отца, если сомневаетесь, то обратитесь к нашему специалисту и он поможет подобрать,
            то что надо.
          </p>
          <p style="margin-bottom: 10px">
            Наша команда не только продает и доставляет подарки, но и создаст настроение праздника на любом
            мероприятии. Мы организуем и декорируем залы торжеств, собираем свадебные букеты невесты. Обращаясь в нашу
            цветочную мастерскую вы передаете создание красоты профессионалам и будьте уверены, все пройдет по высшему
            классу.
          </p>
        </div>
        <div class="" style="background-color: #ccc; align-self: flex-start">
          <YandexMap
              :settings="mapSettings"
          >
            <YandexMapDefaultSchemeLayer/>
            <YandexMapDefaultFeaturesLayer/>
            <YandexMapMarker
                :settings="{
                                coordinates: [65.578139, 57.106595],
                              }"
            >
              <div
                  class="flex items-center justify-center bg-white ring-1 ring-primary-700 rounded-full relative w-10 h-10 -mt-7 -ml-5"
              >
                <img src="/icon/logoicon.svg" width="30px" height="30px" alt="">
              </div>
            </YandexMapMarker>
          </YandexMap>
        </div>
      </div>

    </section>
  </UContainer>
</template>

<style scoped lang="scss">
.grid-container {
  margin-top: 28px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>