<template>
  <div class="container">
    <h1 class="title">Three.js学习案例演示</h1>
    <a-list
      :grid="{gutter:16,column:4}"
      :data-source="list"
    >
      <template v-slot:renderItem="{item,index}">
        <a-list-item>
          <a-card
            hoverable
            @click="handleCardClick(item,index)"
          >
            <template v-slot:cover>
              <img
                class="image"
                alt="example"
                :src="item.imageUrl"
              />
            </template>
            <a-card-meta :title="item.name"/>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'

const imageUrl = 'https://pic-go-1256738511.cos.ap-chengdu.myqcloud.com/images/'

interface List {
  name: string;
  path: string;
  imageUrl: string;
}

export default defineComponent({
  name: 'Index',
  setup () {
    // router实例
    const router = useRouter()
    // 列表
    const list: Array<List> = reactive([
      {
        name: 'Vue Options API演示',
        path: '/gallery1',
        imageUrl: `${imageUrl}20201009140839.png`
      },
      {
        name: 'Vue Composition API演示',
        path: '/gallery2',
        imageUrl: `${imageUrl}20201009140839.png`
      },
      {
        name: '纹理动画',
        path: '/gallery3',
        imageUrl: `${imageUrl}20201009142604.png`
      },
      {
        name: '地球模型',
        path: '/gallery4',
        imageUrl: `${imageUrl}20201009171330.png`
      },
      {
        name: '枪模型',
        path: '/gallery5',
        imageUrl: `${imageUrl}20201009172608.png`
      },
      {
        name: '加载FBX并解析骨骼动画',
        path: '/gallery6',
        imageUrl: `${imageUrl}20201009181212.png`
      },
      {
        name: '加载obj手镯',
        path: '/gallery7',
        imageUrl: `${imageUrl}20201009190049.png`
      },
      {
        name: '心脏模型',
        path: '/gallery8',
        imageUrl: `${imageUrl}20201010165347.png`
      },
      {
        name: '地球大气模型',
        path: '/gallery9',
        imageUrl: `${imageUrl}20201010183425.png`
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

  .image {
    width: 286px;
    height: 174px;
    object-fit: cover;
  }
}
</style>
