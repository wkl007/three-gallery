<template>
  <div class="container">
    <h1 class="title">Three.js学习案例演示</h1>
    <a-list
      :grid="{gutter:16,column:4}"
      :data-source="list"
    >
      <template v-slot:renderItem="{item,index}">
        <a-list-item>
          <a-card hoverable @click="handleCardClick(item,index)">
            <template v-slot:cover>
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            </template>
            <a-card-meta
              :title="item.name"
              :description="item.description"
            />
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'

interface List {
  name: string;
  path: string;
  description: string;
}

export default defineComponent({
  name: 'Index',
  setup () {
    // router实例
    const router = useRouter()
    // 列表
    const list: Array<List> = reactive([
      {
        name: 'demo1',
        path: '/demo1',
        description: 'Three.js Vue Options API演示'
      },
      {
        name: 'demo2',
        path: '/demo2',
        description: 'Three.js Vue Composition API演示'
      }
    ])

    // card点击事件
    function handleCardClick (item: List, index: number): void {
      router.push({ path: item.path })
    }

    return {
      list,
      handleCardClick
    }
  }
})
</script>

<style scoped lang="less">
.container {
  width: 1200px;
  margin: 0 auto;

  .title {
    padding: 40px 0;
    text-align: center;
  }
}
</style>
