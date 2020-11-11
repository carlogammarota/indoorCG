<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <notifications group="foo" />
    <div class="flex-wrap w-3/5 m-auto">
      <!-- <span>{{ date || moment }}</span> -->
      <!-- <span>{{ moment() }}</span> -->

      <p class=" inline-block align-middle text-2xl py-8">
        {{ relogServer }}
      </p>
      <!-- {{ relogHora }} -->
      <p class="text-3xl bg-blue-100 py-4">
        Indoor CG420
      </p>

      <div
        class="border-solid border-gray border-2 p-4 bg-blue-200 my-2"
      >
        <p class="text-2xl ">
          <span class="font-bold">Regar: </span>
          <span class="text-blue-500">{{ range }} minutos</span>
        </p>
        <input
          v-model="range"
          type="range"
          min="2"
          max="16"
          step="2"
          value="2"
          class="w-full"
          id="myRange"
        />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded "
          @click="regarButton()"
        >
          Regar
        </button>
      </div>

      <div
        class="border-solid border-gray border-2 p-4 bg-green-200 mb-4"
      >
        <p class="text-2xl font-bold mt-4">Listado de Regados</p>
        {{ regados }}
        <table class="table-auto m-auto bg-green-400 mt-4">
          <thead>
            <tr>
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">DIA</th>
              <th class="px-4 py-2">MINUTOS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in regados" :key="item._id">
              <td class="border px-4 py-2">{{ item._id }}</td>
              <td class="border px-4 py-2">{{ item.dia }}</td>
              <td class="border px-4 py-2">{{ item.tiempo }}</td>
            </tr>
            <!-- <tr class="bg-gray-100">
              <td class="border px-4 py-2">
                A Long and Winding Tour of the History of UI
                Frameworks and Tools and the Impact on Design
              </td>
              <td class="border px-4 py-2">Adam</td>
              <td class="border px-4 py-2">112</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Intro to JavaScript</td>
              <td class="border px-4 py-2">Chris</td>
              <td class="border px-4 py-2">1,280</td>
            </tr> -->
          </tbody>
        </table>
        <p class="text-2xl font-bold mt-4">Programar Nuevo Regado</p>
        <!-- <datepicker></datepicker> -->
        <!-- <datetime v-model="date"></datetime> -->

        <datetime
          v-model="date"
          type="datetime"
          input-format="MMMM Do YYYY, h:mm:ss a"
          wrapper-class="my-wrapper-class"
          input-class="theme-orange"
          class="w-full text-lg my-wrapper-class my-4"
          placeholder="Select date"
          moment-locale="es"
          :i18n="{ ok: 'De acuerdo', cancel: 'Cancelar' }"
          :disabled-dates="[
            '2017-09-07',
            ['2017-09-25', '2017-10-05'],
          ]"
          max-date="2017-12-10"
          min-date="2017-07-10"
          monday-first
          auto-continue
          auto-close
          required
        ></datetime>
        <p class="text-2xl mt-4">
          <span class="font-bold">Tiempo: </span
          ><span class="text-green-500">{{ tiempo }} minutos</span>
        </p>
        <input
          v-model="tiempo"
          type="range"
          min="2"
          max="16"
          step="2"
          value="2"
          class="w-full"
          id="myRange"
        />
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-12 rounded "
          @click="programarRegado()"
        >
          Programar Regado
        </button>
      </div>

      <div class="border-solid border-gray border-2 p-4 mt-2">
        <p class="text-2xl">Luz Sodio</p>
        <button
          class=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2"
          @click="encenderLuz()"
        >
          Encender Luz
        </button>
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
          @click="apagarLuz()"
        >
          Apagar Luz
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import Datepicker from 'vuejs-datepicker';
import { Datetime } from 'vue-datetime';
// import HelloWorld from './components/HelloWorld.vue'
import moment from 'moment';
export default {
  name: 'App',
  data() {
    return {
      range: 2,
      relogServer: '',
      date: moment(),
      tiempo: 2,
      regados: [],
    };
  },
  components: {
    // HelloWorld
    datetime: Datetime,
    // Datepicker,
  },
  sockets: {
    connect: function() {
      console.log('socket connected');
    },
    customEmit: function() {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)',
      );
    },
    info: function(data) {
      console.log('info', data);
      this.$notify({
        group: 'foo',
        title: 'Important message',
        text: data.message,
        duration: data.segundos,
      });
    },
    // relog: data => {
    //   console.log('Relog:', data);
    //   // this.relogServer = data;
    //   return data;
    // },
    relog: function(data) {
      console.log('Relog:', data);
      this.relogServer = data;
    },
    regados: function(data) {
      console.log('Regados', data);
      this.regados = data;
    },
  },
  methods: {
    programarRegado() {
      if (this.date) {
        let dia = moment(this.date).format('MMMM Do YYYY, h:mm:ss a');
        // console.log('programar regado para el dia', dia);
        this.$socket.emit('programarRegado', {
          dia: dia,
          tiempo: this.tiempo,
        });
      } else {
        alert('Seleccione la fecha y hora');
      }
    },
    regarButton: function() {
      // $socket is socket.io-client instance
      // this.$socket.emit('regarOn', this.range * 60);

      // setTimeout(data => {
      console.log('regar');
      // }, this.range);
      // while (this.range ) {
      //   console.log('regar', data);
      // }
      this.$socket.emit('regarOn', this.range);
    },
    encenderLuz() {
      console.log('encenderLuz');
      this.$socket.emit('luzOn');
    },
    apagarLuz() {
      console.log('apagarLuz');
      this.$socket.emit('luzOff');
    },

    moment: function() {
      return moment().format('MMMM Do YYYY, h:mm:ss a');
      // return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },
  },
  computed: {
    // formattedDate() {
    // return moment(this.givenDate).format('YYYY');
    // return moment(this.givenDate);
    // },
  },
  // filters: {
  //   moment: function(date) {
  //     return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  //   },
  // },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
/* .theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange
  .vdatetime-calendar__month__day--selected:hover
  > span
  > span {
  background: #ff9800;
}

.theme-orange .vdatetime-year-picker__item--selected,
.theme-orange .vdatetime-time-picker__item--selected,
.theme-orange .vdatetime-popup__actions__button {
  color: #ff9800;
} */

.my-wrapper-class input {
  padding: 10px !important;
  width: inherit !important;
}
.vdatetime-fade-enter-active,
.vdatetime-fade-leave-active {
  transition: opacity 0.4s;
}
.vdatetime-fade-enter,
.vdatetime-fade-leave-to {
  opacity: 0;
}
.vdatetime-overlay {
  z-index: 999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 0.5s;
}
.vdatetime-popup {
  box-sizing: border-box;
  z-index: 1000;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 340px;
  max-width: calc(100% - 30px);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  color: #444;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  line-height: 1.18;
  background: #fff;
  -webkit-tap-highlight-color: transparent;
}
.vdatetime-popup * {
  box-sizing: border-box;
}
.vdatetime-popup__header {
  padding: 18px 30px;
  background: #3f51b5;
  color: #fff;
  font-size: 32px;
}
.vdatetime-popup__title {
  margin-bottom: 8px;
  font-size: 21px;
  font-weight: 300;
}
.vdatetime-popup__year {
  font-weight: 300;
  font-size: 14px;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.3s;
}
.vdatetime-popup__year:hover {
  opacity: 1;
}
.vdatetime-popup__date {
  line-height: 1;
  cursor: pointer;
}
.vdatetime-popup__actions {
  padding: 0 20px 10px 30px;
  text-align: right;
}
.vdatetime-popup__actions__button {
  display: inline-block;
  border: none;
  padding: 10px 20px;
  background: 0 0;
  font-size: 16px;
  color: #3f51b5;
  cursor: pointer;
  transition: color 0.3s;
}
.vdatetime-popup__actions__button:hover {
  color: #444;
}
.vdatetime-calendar__navigation--next:hover svg path,
.vdatetime-calendar__navigation--previous:hover svg path {
  stroke: #888;
}
.vdatetime-calendar__navigation,
.vdatetime-calendar__navigation * {
  box-sizing: border-box;
}
.vdatetime-calendar__navigation {
  position: relative;
  margin: 15px 0;
  padding: 0 30px;
  width: 100%;
}
.vdatetime-calendar__navigation--next,
.vdatetime-calendar__navigation--previous {
  position: absolute;
  top: 0;
  padding: 0 5px;
  width: 18px;
  cursor: pointer;
}
.vdatetime-calendar__navigation--next svg,
.vdatetime-calendar__navigation--previous svg {
  width: 8px;
}
.vdatetime-calendar__navigation--next svg path,
.vdatetime-calendar__navigation--previous svg path {
  transition: stroke 0.3s;
}
.vdatetime-calendar__navigation--previous {
  left: 25px;
}
.vdatetime-calendar__navigation--next {
  right: 25px;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.vdatetime-calendar__current--month {
  text-align: center;
  text-transform: capitalize;
}
.vdatetime-calendar__month {
  padding: 0 20px;
  transition: height 0.2s;
}
.vdatetime-calendar__month__day,
.vdatetime-calendar__month__weekday {
  display: inline-block;
  width: 14.28571%;
  line-height: 36px;
  text-align: center;
  font-size: 15px;
  font-weight: 300;
  cursor: pointer;
}
.vdatetime-calendar__month__day > span,
.vdatetime-calendar__month__weekday > span {
  display: block;
  width: 100%;
  position: relative;
  height: 0;
  padding: 0 0 100%;
  overflow: hidden;
}
.vdatetime-calendar__month__day > span > span,
.vdatetime-calendar__month__weekday > span > span {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 0;
  border-radius: 50%;
  transition: background-color 0.3s, color 0.3s;
}
.vdatetime-calendar__month__weekday {
  font-weight: 700;
}
.vdatetime-calendar__month__day:hover > span > span {
  background: #eee;
}
.vdatetime-calendar__month__day--selected:hover > span > span,
.vdatetime-calendar__month__day--selected > span > span {
  color: #fff;
  background: #3f51b5;
}
.vdatetime-calendar__month__day--disabled {
  opacity: 0.4;
  cursor: default;
}
.vdatetime-calendar__month__day--disabled:hover > span > span {
  color: inherit;
  background: 0 0;
}
.vdatetime-time-picker__list::-webkit-scrollbar-thumb {
  background: #ccc;
}
.vdatetime-time-picker__list::-webkit-scrollbar-track {
  background: #efefef;
}
.vdatetime-time-picker * {
  box-sizing: border-box;
}
.vdatetime-time-picker {
  box-sizing: border-box;
}
.vdatetime-time-picker::after {
  content: '';
  display: table;
  clear: both;
}
.vdatetime-time-picker__list {
  float: left;
  width: 50%;
  height: 305px;
  overflow-y: scroll;
}
.vdatetime-time-picker__list::-webkit-scrollbar {
  width: 3px;
}
.vdatetime-time-picker__with-suffix .vdatetime-time-picker__list {
  width: 33.3%;
}
.vdatetime-time-picker__item {
  padding: 10px 0;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  transition: font-size 0.3s;
}
.vdatetime-time-picker__item:hover {
  font-size: 32px;
}
.vdatetime-time-picker__item--selected {
  color: #3f51b5;
  font-size: 32px;
}
.vdatetime-time-picker__item--disabled {
  opacity: 0.4;
  cursor: default;
  font-size: 20px !important;
}
.vdatetime-year-picker__list::-webkit-scrollbar-thumb {
  background: #ccc;
}
.vdatetime-year-picker__list::-webkit-scrollbar-track {
  background: #efefef;
}
.vdatetime-year-picker * {
  box-sizing: border-box;
}
.vdatetime-year-picker {
  box-sizing: border-box;
}
.vdatetime-year-picker::after {
  content: '';
  display: table;
  clear: both;
}
.vdatetime-year-picker__list {
  float: left;
  width: 100%;
  height: 305px;
  overflow-y: scroll;
}
.vdatetime-year-picker__list::-webkit-scrollbar {
  width: 3px;
}
.vdatetime-year-picker__item {
  padding: 10px 0;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  transition: font-size 0.3s;
}
.vdatetime-year-picker__item:hover {
  font-size: 32px;
}
.vdatetime-year-picker__item--selected {
  color: #3f51b5;
  font-size: 32px;
}
.vdatetime-year-picker__item--disabled {
  opacity: 0.4;
  cursor: default;
}
.vdatetime-year-picker__item--disabled:hover {
  color: inherit;
  background: 0 0;
}
.vdatetime-month-picker__list::-webkit-scrollbar-thumb {
  background: #ccc;
}
.vdatetime-month-picker__list::-webkit-scrollbar-track {
  background: #efefef;
}
.vdatetime-month-picker * {
  box-sizing: border-box;
}
.vdatetime-month-picker {
  box-sizing: border-box;
}
.vdatetime-month-picker::after {
  content: '';
  display: table;
  clear: both;
}
.vdatetime-month-picker__list {
  float: left;
  width: 100%;
  height: 305px;
  overflow-y: scroll;
}
.vdatetime-month-picker__list::-webkit-scrollbar {
  width: 3px;
}
.vdatetime-month-picker__item {
  padding: 10px 0;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  transition: font-size 0.3s;
}
.vdatetime-month-picker__item:hover {
  font-size: 32px;
}
.vdatetime-month-picker__item--selected {
  color: #3f51b5;
  font-size: 32px;
}
.vdatetime-month-picker__item--disabled {
  opacity: 0.4;
  cursor: default;
}
.vdatetime-month-picker__item--disabled:hover {
  color: inherit;
  background: 0 0;
}
</style>
