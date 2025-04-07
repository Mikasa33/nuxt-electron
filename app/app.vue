<script setup lang="ts">
import { UFormField } from '#components'

const state = ref({
  name: '',
  age: 0,
  email: '',
  remark: ''
})

async function onSubmit() {
  client.add({ ...state.value }).then(res => {
    console.log(res)
    fetch()
  })
}

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'remark',
    header: 'Remark'
  }
]
const data = ref<unknown[]>([])

function fetch() {
  client.list().then(res => {
    data.value = res
    console.log(res)
  })
}

onMounted(() => {
  fetch()
})
</script>

<template>
  <UApp>
    <UCard class="m-5">
      <UForm :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Name" name="name">
          <UInput v-model="state.name" />
        </UFormField>

        <UFormField label="Age" name="age">
          <UInputNumber v-model="state.age" />
        </UFormField>

        <UFormField label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormField>

        <UFormField label="Remark" name="remark">
          <UInput v-model="state.remark" />
        </UFormField>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>
    </UCard>

    <UCard class="m-5">
      <UTable :data="data" :columns="columns" class="flex-1" />
    </UCard>
  </UApp>
</template>
