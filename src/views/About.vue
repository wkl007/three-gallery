<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul>
      <li
        v-for="(item,index) in list"
        :key="index"
        :class="item.active?'active':''"
        @click="toggleList(item,index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <button @click="processObject">对象处理</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

interface ListProps {
  name: string;
  active?: boolean;
}

const useList = () => {
  const list: Array<ListProps> = reactive([
    {
      name: '1'
    },
    {
      name: '2'
    },
    {
      name: '3'
    },
    {
      name: '4'
    }
  ])
  const toggleList = (item: ListProps, index: number): void => {
    list[index].active = !list[index].active
    console.log(list[index])
  }
  return {
    list,
    toggleList
  }
}

const useObject = () => {
  const obj: ListProps = reactive({
    name: '2222',
    title: 222
  })
  const processObject = (): void => {
    obj.active = !obj.active
    console.log(obj)
  }
  return {
    obj,
    processObject
  }
}

export default defineComponent({
  name: 'about',
  setup (props, e) {
    const { list, toggleList } = useList()
    const { obj, processObject } = useObject()
    return {
      list,
      obj,
      toggleList,
      processObject
    }
  }
})

/* export default defineComponent({
  name: 'about',
  data () {
    return {
      list: [
        {
          name: '1'
        },
        {
          name: '2'
        },
        {
          name: '3'
        },
        {
          name: '4'
        }
      ] as Array<ListProps>,
      obj: {
        name: '2222',
        title: 222
      } as ListProps
    }
  },
  methods: {
    toggleList (item: ListProps, index: number): void {
      this.list[index].active = !this.list[index].active
      console.log(this.list[index])
    },
    processObject (): void {
      this.obj.active = !this.obj.active
      console.log(this.obj)
    }
  }
}) */
</script>

<style lang="less">
.active {
  background: red;
}
</style>
