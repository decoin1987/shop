<script setup lang="ts">
import {
  YandexMap,
  YandexMapControl,
  YandexMapControlButton,
  YandexMapControls,
  YandexMapDefaultMarker,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapGeolocationControl,
  YandexMapEntity,
  YandexMapFeature,
  YandexMapMarker,
  getBoundsFromCoords,
  getLocationFromBounds,
  YandexMapHint,
  YandexMapListener,
} from 'vue-yandex-maps';
import {ref, shallowRef, watch} from 'vue';
import type {SearchResponse} from '@yandex/ymaps3-types/imperative/search';
import type {LngLat, YMap, YMapFeatureProps} from '@yandex/ymaps3-types';
import type {BehaviorMapEventHandler, BehaviorType, DomEvent} from '@yandex/ymaps3-types';
import type {YMapDefaultMarker} from '@yandex/ymaps3-types/packages/markers';
import {triggerRef} from "@vue/reactivity";
import type { YMapLocationRequest } from '@yandex/ymaps3-types/imperative/YMap';

const BEHAVIOR: BehaviorType[] = ['drag', 'scrollZoom', 'dblClick', 'mouseRotate', 'mouseTilt'];
const selectedSearch = ref(null);
const selectedSearchProps = ref({
  entrance: null,
  floor: null,
  flat: null,
});
const selectedSearchPropsDef = {
  entrance: null,
  floor: null,
  flat: null,
}
const LOCATION = ref<YMapLocationRequest>({
  center: [65.578139, 57.106595],
  zoom: 14,
});
const mapSettings = ref({
  location: LOCATION,
  behaviors: BEHAVIOR,
  searchControlProvider: 'yandex#map',
})
const position = ref(null)
const map = shallowRef<YMap | null>(null);
const searchResponse = shallowRef<null | SearchResponse>(null);
const deliveryAddress = ref([65.578139, 57.106595]);

const positionUser = async (e) => {
  // const item = await ymaps3.geolocation.getPosition('browser')
  const items = await search(e)
  selectedSearch.value = items[0]
  map.value?.setLocation({
    center: selectedSearch.value.coordinates,
    zoom: 18,
    duration: 500,
  });
  deliveryAddress.value.coordinates = selectedSearch.value.coordinates
  selectedSearchProps.value = JSON.parse(JSON.stringify(selectedSearchPropsDef))
}
const search = async (q: string) => {
  const address = await ymaps3.search({ //suggest search
    provider: 'yandex#search', // yandex#search : yandex#map
    text: q,
    bounds: map.value?.bounds,
  });
  const items = address.map((el) => el = {
    title: el.properties.name + ', ' + el.properties.description,
    coordinates: el.geometry.coordinates,
  })
  searchResponse.value = items
  return items
}
const events = reactive({
  map: {
    update: false,
    resize: false,
  },
  // dom: {
  //   click: false,
  //   fastClick: false,
  //   dblClick: false,
  //   contextMenu: false,
  //   rightDblClick: false,
  //   mouseMove: false,
  //   mouseEnter: false,
  //   mouseLeave: false,
  //   mouseUp: false,
  //   mouseDown: false,
  // },
  behavior: {
    scrollZoom: false,
    drag: false,
    mouseRotate: false,
    mouseTilt: false,
  },
});
const isMove = ref(false)

function debounce<T extends Function>(func: T, delay: number): (...args: any[]) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function _(this: any, ...args: any[]): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const createEvent = <T extends keyof typeof events, E = keyof typeof events[T]>(category: T, type: E | boolean): any => {
  const eventState = events[category] as any;

  if (typeof type !== 'boolean') {
    const endEvent = debounce(() => {
      eventState[type] = false;
    }, 10);

    return (object: Record<string, any>, event?: DomEvent) => {
      // console.log(`${type} Object: `, object, `\n`, `${type} Event: `, event);
      eventState[type] = true;
      endEvent();
    };
  }
  return (object: Parameters<BehaviorMapEventHandler>[0]) => {
    if (!type) {
      isMove.value = false
      deliveryAddress.value = object.location.center
      search(object.location.center).then((r) => {
        selectedSearch.value = r[0]
        selectedSearchProps.value = JSON.parse(JSON.stringify(selectedSearchPropsDef))

      })
    }
    if (type) {
      isMove.value = true
    }
    // console.log(`${type ? 'actionStart' : 'actionEnd'} Object:`, object);
    if (!(object.type in events.behavior)) return;
    eventState[object.type] = type;
  };
};

const onDragEnd = async (r) => {
  const items = await search(r)
  selectedSearch.value = items[0]
  map.value?.setLocation({
    center: r,
    zoom: 18,
    duration: 500,
  });
  selectedSearchProps.value = JSON.parse(JSON.stringify(selectedSearchPropsDef))
}
const changeAddress = async () => {
  map.value?.setLocation({
    center: selectedSearch.value.coordinates,
    zoom: 18,
    duration: 700,
  });
  selectedSearchProps.value = JSON.parse(JSON.stringify(selectedSearchPropsDef))
  deliveryAddress.value.coordinates = selectedSearch.value.coordinates
}
const village = ref(false)
const errorsEnum = {
  entrance: 'номер подъезда',
  floor: 'этаж',
  flat: 'номер квартиры',
}
const addAddressUnavailable = computed(() => {
  let errors: [] = []
  if (selectedSearch.value) {
    if (selectedSearchProps.value.entrance && selectedSearchProps.value.floor && selectedSearchProps.value.flat) {
      return {state: false, errors}
    } else if (village.value) {
      return {state: false, errors}
    }
    for (let i in selectedSearchProps.value) {
      if (!selectedSearchProps.value[i]) {
        errors.push(errorsEnum[i])
      }
    }
    return {state: true, errors}
  }

  return {state: true, errors}
})
const features: YMapFeatureProps[] = [
  {
    style: {
      stroke: [{
        color: '#1bad0300',
        width: 0,
      }],
      fill: '#56db40',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [
            65.47294208327433,
            57.116380328578884
          ],
          [
            65.50045154855839,
            57.111348681243804
          ],
          [
            65.52465163019963,
            57.09768520306513
          ],
          [
            65.5207967736115,
            57.08273606956186
          ],
          [
            65.56946215875782,
            57.08454183082379
          ],
          [
            65.58205337728492,
            57.07618031041072
          ],
          [
            65.60927434426132,
            57.07987274810684
          ],
          [
            65.61842163194872,
            57.083778479878134
          ],
          [
            65.62894690219777,
            57.09200206664593
          ],
          [
            65.63666931838765,
            57.08870245248566
          ],
          [
            65.66310399755199,
            57.090848625001435
          ],
          [
            65.67232836954675,
            57.09447353824956
          ],
          [
            65.67438786623767,
            57.09673182970611
          ],
          [
            65.6791362143601,
            57.10361780190648
          ],
          [
            65.67785313790633,
            57.1072098152476
          ],
          [
            65.67794335246822,
            57.110708078806105
          ],
          [
            65.67931883542056,
            57.11395139121511
          ],
          [
            65.68206760938857,
            57.11663411056929
          ],
          [
            65.6903321761625,
            57.12134253370664
          ],
          [
            65.7006588017217,
            57.127726181598206
          ],
          [
            65.704024205704,
            57.13170977990252
          ],
          [
            65.70373680742568,
            57.13566279747372
          ],
          [
            65.69817293385049,
            57.14112350037823
          ],
          [
            65.69432816729157,
            57.144768791008644
          ],
          [
            65.68708428132658,
            57.1602119770785
          ],
          [
            65.68557707341955,
            57.16862123360045
          ],
          [
            65.68652169004214,
            57.17189269889305
          ],
          [
            65.69075682931073,
            57.17609236997006
          ],
          [
            65.69307571638794,
            57.1787980127782
          ],
          [
            65.69352102231375,
            57.181808324845555
          ],
          [
            65.69193701733498,
            57.186189309832905
          ],
          [
            65.68725861290483,
            57.19910210626202
          ],
          [
            65.68431191697952,
            57.20393544326467
          ],
          [
            65.67963231068137,
            57.208075259725454
          ],
          [
            65.67334905777956,
            57.2116819126498
          ],
          [
            65.66571489633378,
            57.214509633465795
          ],
          [
            65.65995267118676,
            57.2157837111311
          ],
          [
            65.65565691454933,
            57.209579516417925
          ],
          [
            65.65037884846203,
            57.20326917736622
          ],
          [
            65.62826752288862,
            57.21248404520337
          ],
          [
            65.61311985650198,
            57.20524942997299
          ],
          [
            65.60454547450804,
            57.202097436293876
          ],
          [
            65.60507588867983,
            57.210774757750166
          ],
          [
            65.5969170001693,
            57.21122401714455
          ],
          [
            65.59762958698923,
            57.21413811630225
          ],
          [
            65.58579951968554,
            57.21720161897247
          ],
          [
            65.57320806368315,
            57.21131730337222
          ],
          [
            65.5719203988749,
            57.211227494318564
          ],
          [
            65.56773007438393,
            57.21041412756936
          ],
          [
            65.56351394212938,
            57.20912251196235
          ],
          [
            65.56290884491882,
            57.20837640439312
          ],
          [
            65.56247755028083,
            57.206829014981906
          ],
          [
            65.55595334735881,
            57.20428753120756
          ],
          [
            65.55117111178369,
            57.20171544197346
          ],
          [
            65.54878237343362,
            57.20173373150503
          ],
          [
            65.54116642025105,
            57.19475431799618
          ],
          [
            65.53461186162853,
            57.18614159998586
          ],
          [
            65.52257985209268,
            57.18704143816872
          ],
          [
            65.51021237637745,
            57.19160321597522
          ],
          [
            65.50320083847683,
            57.19485029032585
          ],
          [
            65.48090003999839,
            57.19365468597789
          ],
          [
            65.46958556964493,
            57.19618658939061
          ],
          [
            65.45923222682985,
            57.20049901883753
          ],
          [
            65.45106756657096,
            57.19479465360256
          ],
          [
            65.44909845269628,
            57.19337896043243
          ],
          [
            65.44758002415766,
            57.192353718013955
          ],
          [
            65.44622819081424,
            57.19111888138681
          ],
          [
            65.44446866170092,
            57.18836947361223
          ],
          [
            65.44376055852058,
            57.18561986038479
          ],
          [
            65.44307391301284,
            57.18278265001929
          ],
          [
            65.4423658098325,
            57.17977042346991
          ],
          [
            65.44174353734164,
            57.17715418916787
          ],
          [
            65.43988981543752,
            57.16870739228636
          ],
          [
            65.43916025458563,
            57.16318170523933
          ],
          [
            65.4398039847492,
            57.15857633267053
          ],
          [
            65.4404142436626,
            57.15496540500945
          ],
          [
            65.44155150028456,
            57.15291300429849
          ],
          [
            65.44088631244894,
            57.14087617208423
          ],
          [
            65.46621349100768,
            57.12501654739341
          ],
          [
            65.47294208327433,
            57.116380328578884
          ]
        ]
      ],
    },
    properties: {
      hint: 250,
    },
  },
  {
    style: {
      stroke: [{
        color: 'rgba(232,110,208,1)',
        width: 0,
      }],
      fill: 'rgba(200,136,245,1)',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [
            65.72796770530287,
            57.14448373348776
          ],
          [
            65.73444792228283,
            57.146000069121264
          ],
          [
            65.74672171073486,
            57.146559931085505
          ],
          [
            65.73899694877196,
            57.15549324477939
          ],
          [
            65.74165770011459,
            57.159049640170565
          ],
          [
            65.75011202292953,
            57.15828008861751
          ],
          [
            65.75225779014141,
            57.165391998151456
          ],
          [
            65.75848051505595,
            57.17201300063931
          ],
          [
            65.75920503273419,
            57.174006472156506
          ],
          [
            65.75658719673562,
            57.17577799190106
          ],
          [
            65.75008552208351,
            57.17739792545353
          ],
          [
            65.74466487770516,
            57.179905482089666
          ],
          [
            65.73012325571597,
            57.18331265561354
          ],
          [
            65.72533819483337,
            57.18317283050907
          ],
          [
            65.72222683237612,
            57.18367386798033
          ],
          [
            65.71541934326217,
            57.18231411575153
          ],
          [
            65.71308045700118,
            57.18043803388679
          ],
          [
            65.70856481119371,
            57.17220467591451
          ],
          [
            65.68801909013953,
            57.173341077965574
          ],
          [
            65.68655996843543,
            57.171889973711025
          ],
          [
            65.68562655969824,
            57.16861458038532
          ],
          [
            65.68711786791043,
            57.16019746495939
          ],
          [
            65.69434391703898,
            57.144754403892364
          ],
          [
            65.69897190409462,
            57.14036458429446
          ],
          [
            65.70377842264922,
            57.13562802051628
          ],
          [
            65.72796770530287,
            57.14448373348776
          ]
        ]
      ],
    },
    properties: {
      hint: 450,
    },
  },
];
const deliveryZonePrice = computed(() => {
  if (!!selectedSearch?.value?.coordinates) {
    for (let zone of features) {
      let polygon = zone.geometry.coordinates[0]
      // var point = map.value?.settings.location.center
      let point = deliveryAddress?.value
      let j = polygon.length - 1;
      let odd = false
      for (let i in polygon) {
        if (((polygon[i][1] > point[1]) !== (polygon[j][1] > point[1])) // One point needs to be above, one below our y coordinate
            // ...and the edge doesn't cross our Y coordinate before our x coordinate (but between our x coordinate and infinity)
            && (point[0] < ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]))) {
          // Invert odd
          odd = !odd
        }
        j = parseInt(i)
      }
      if (odd) {
        return zone.properties.hint;
      }
    }
    return 1000;
  }
})

</script>
<template>
  <div class="flex p-0 items-start w-auto rounded-2xl" style="overflow: hidden">
    <div class="flex gap-3 flex-wrap items-end px-5 pb-10 pt-5">
      <div class="flex flex-col flex-wrap gap-2">
        <h1 class="text-xl font-bold mb-4">Адрес доставки</h1>
        <UInputMenu
            class="w-full"
            placeholder="Адрес"
            v-model="selectedSearch"
            :search="search"
            :option="searchResponse"
            @change="changeAddress"
            debounce="200"
            size="xl"
            option-attribute="title"
            :nullable="true"
        >
          <template #option="{ option: address }">
            <span class="truncate">{{ address.title }}</span>
          </template>
        </UInputMenu>
        <div class="flex gap-1">
          <UInput :disabled="village" placeholder="Подъезд *" class="w-full" size="xl" autocomplete="off"
                  v-model="selectedSearchProps.entrance"/>

          <UInput :disabled="village" placeholder="Этаж *" class="w-full" size="xl" autocomplete="off" v-model="selectedSearchProps.floor"/>
          <!--            <span>Квартира *</span>-->
          <UInput :disabled="village" placeholder="Квартира *" class="w-full" size="xl" autocomplete="off" v-model="selectedSearchProps.flat"/>
        </div>
        <div class="bg-white px-4 py-3 rounded-2xl flex items-center">
          <UCheckbox v-model="village" name="notifications" label="Частный дом *"/>
        </div>
      </div>
      <div v-if="!!selectedSearch" class="bg-white rounded-xl p-4 mt-2 w-full">
        <h2 class="font-bold text-xs mb-2">Ваш адрес:</h2>
        <p>{{ selectedSearch?.title }}</p>
        <template v-if="!village">
          <p>Подъезд: {{ selectedSearchProps.entrance }}</p>
          <p>Этаж: {{ selectedSearchProps.floor }}</p>
          <p>Квартира: {{ selectedSearchProps.flat }}</p>
        </template>
        <template v-else>
          <p>Частный дом</p>
        </template>

      </div>
      <UButton :disabled="addAddressUnavailable.state" block
               @click="$emit('addAddress', { ...selectedSearch, ...selectedSearchProps, deliveryZonePrice, village})" size="xl"
      >
        Доставить сюда
      </UButton>
      <div v-show="!!addAddressUnavailable?.errors.length" class="w-full">
        <p class="text-xs text-rose-700 font-semibold">
          Введите: {{ addAddressUnavailable?.errors?.join(', ') }}.</p>
      </div>
      <!--      {{ selectedSearch?.title }}-->
    </div>
    <div style="width: 500px; height: 600px">
      <YandexMap
          :settings="mapSettings"
          v-model="map"
          width="550px"
          height="600px"
      >
        <YandexMapDefaultSchemeLayer/>
        <YandexMapDefaultFeaturesLayer/>
        <yandex-map-controls :settings="{ position: 'left' }">
          <yandex-map-geolocation-control v-model="position" :settings="{
            onGeolocatePosition: (e) => positionUser(e)
          }"
          />
        </yandex-map-controls>
        <YandexMapListener :settings="{
        onClick: (_, e) => onDragEnd(e.coordinates),
        // onUpdate: createEvent('map', 'update'),
        // onResize: createEvent('map', 'resize'),
        // onClick: createEvent('dom', 'click'),
        // onFastClick: createEvent('dom', 'fastClick'),
        // onDblClick: createEvent('dom', 'dblClick'),
        // onContextMenu: createEvent('dom', 'contextMenu'),
        // onRightDblClick: createEvent('dom', 'rightDblClick'),
        // onMouseMove: createEvent('dom', 'mouseMove'),
        // onMouseEnter: createEvent('dom', 'mouseEnter'),
        // onMouseLeave: createEvent('dom', 'mouseLeave'),
        // onMouseDown: createEvent('dom', 'mouseDown'),
        // onMouseUp: createEvent('dom', 'mouseUp'),
        onActionStart: createEvent('behavior', true),
        onActionEnd: createEvent('behavior', false),
        }"/>
        <yandex-map-controls :settings="{ position: 'top left' }">
          <yandex-map-entity>
            <div class="flex items-end justify-center" style="position: absolute; width: 474px; height: 288px">
              <div class="flex flex-col justify-end" style="margin-top: -80px; position: relative">
                <div style="z-index: 2; width: 80px; height: 80px;">
                  <img
                      :style="`transform: translateY(${ isMove ? '-10' : '0' }px);`"
                      style="width: 80px; height: 80px; transition: all ease-out 0.25s;"
                      src="/icon/map-marker.svg"
                      width="50px" alt=""
                  >
                </div>
                <p v-if="deliveryZonePrice"
                   :style="`transform: translateY(${ isMove ? '-8' : '0' }px);`"
                   class="text-sm font-bold pl-4 pr-2 py-1 bg-stone-100 text-zinc-600 rounded-2xl"
                   style="position: absolute; top: 13px; width: 140px; left: 56px; transition: all ease-out 0.3s;"
                >Доставка {{ deliveryZonePrice }} р.</p>
              </div>
            </div>
          </yandex-map-entity>
        </yandex-map-controls>
        <!--        <YandexMapDefaultMarker
                    v-model="deliveryAddress"
                    :settings="{
                      coordinates: [65.578139, 57.106595],
                      draggable: true,
                      title: deliveryZonePrice,
                      properties: {
                        // hint: selectedSearch?.title || '',
                      }
                    }"
                />-->
        <!--              <YandexMapMarker
                          :settings="{
                            coordinates: [65.578139, 57.106595],
                          }"
                      >
                        <div
                            class="flex items-center justify-center bg-white ring-1 ring-primary-700 rounded-full relative w-10 h-10 -mt-7 -ml-5"
                        >
                          <img src="/icon/logoicon.svg" width="30px" height="30px" alt="">
                        </div>
                      </YandexMapMarker>-->
        <!--        <YandexMapHint hint-property="hint">
          <template #default="{ content }">
            <div class="hint">
              {{ content }}
            </div>
          </template>
        </YandexMapHint>-->
        <YandexMapFeature v-for="(feature, index) in features" :key="index" :settings="feature"/>
      </YandexMap>
    </div>
  </div>
</template>


<style scoped>

.hint {
  position: absolute;
  padding: 2px 7px;
  background: #fef2f2;
  font-size: 12px;
  border-radius: 999px;
  white-space: nowrap;
  transform: translate(15%, 105%);
}
</style>
