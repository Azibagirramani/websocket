<template>
  <div>
    <div
      class="d-flex align-items-center justify-content-center bg-primary-1 vh-100"
    >
      <div class="">
        <h1 class="text-center">
          Your currently
          <span
            class="badge rounded-pill"
            :class="status ? 'bg-primary' : 'bg-danger'"
            >{{ status ? "Connected" : "Disconnected" }}</span
          >
        </h1>

        <div class="d-flex justify-content-end gap-4">
          <button
            class="btn btn-danger rounded-0 shadow border-0"
            @click="stopSocket"
            :disabled="!status"
          >
            Stop cars
          </button>
        </div>

        <div class="d-flex justify-content-end my-5">
          <BaseSelect v-model="select" :items="['all', 'warsaw', 'opole']" />
        </div>

        <div class="container fixed">
          <div class="row g-2 mt-5 row-cols-3">
            <div
              class="col"
              v-for="(items, index) in computedData"
              :key="index"
            >
              <div class="card border-0 shadow">
                <div
                  class="card-header d-flex justify-content-end border-0 bg-transparent"
                >
                  <Battery :percent="items.battery_status.percentage_level" />
                </div>
                <div class="card-body text-center">
                  <span class="circle"> </span>

                  <h5 class="mt-3">{{ items.name }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Battery from "./component/battery.vue";
import BaseSelect from "./component/_select.vue";

import SocketService, { vehicle as vehicleDto } from "./services/socketService";
export default defineComponent({
  name: "App",
  components: {
    Battery,
    BaseSelect,
  },
  data() {
    return {
      select: "" as string,
      message: "Hello World" as string,
      status: false as boolean,
      content: [] as vehicleDto[],
    };
  },

  computed: {
    computedData() {
      const data = this.content as vehicleDto[];
      const search = this.select as string;
      if (search) {
        return data.filter((item) => item.group.includes(search));
      }
      return data;
    },
  },

  methods: {
    startSocket() {
      SocketService.sendData({ name: "vehicle/view/rentable/subscribe" });
    },
    stopSocket() {
      SocketService.close();
    },
  },

  watch: {
    select(value: string) {
      if (value === "all") {
        this.select = "";
      }
    },

    status: {
      handler(value: boolean) {
        if (value) {
          this.startSocket();
        } else {
          this.stopSocket();
        }
      },
    },
  },

  mounted() {
    SocketService.onMessage((data: any) => {
      const val = JSON.parse(data.data);

      // ignore if vehicle is null
      if (val.data) {
        this.content.push(...val.data);
      }
    });

    SocketService.socket.onopen = () => {
      this.status = true;
    };

    SocketService.socket.onclose = () => {
      this.status = false;
    };
  },

  beforeMount() {
    SocketService.connect();
  },

  beforeUnmount() {
    SocketService.close();
  },
});
</script>

<style lang="scss" scoped>
.fixed {
  width: 200rem !important;
  height: 30rem;
  border: 0.5px solid #ccc;
  position: relative;
  overflow: scroll;
  overflow-x: hidden;
}

.bg-primary-1 {
  background-color: #f6f6f6;
}

.card {
  margin: 1rem;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: translateY(-0.5rem);
  }
}

.circle {
  min-width: 5rem;
  min-height: 5rem;
  border-radius: 50%;
  border: 2px solid red;
  display: inline-block;
}

h5 {
  color: #818385;
}
</style>
