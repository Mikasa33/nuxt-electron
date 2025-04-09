<script lang="tsx" setup>
const toast = useToast()

const state = ref({
  name: '',
  age: 0,
  email: '',
  remark: '',
})

async function onSubmit() {
  client.addUser({ ...state.value }).then(() => {
    fetch()
    toast.add({ title: '添加成功！' })
    state.value = {
      name: '',
      age: 0,
      email: '',
      remark: '',
    }
  })
}

function onDelete(row: any) {
  client.deleteUser({ id: row.id }).then(() => {
    fetch()
    toast.add({ title: '删除成功！' })
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
    header: 'Remark',
  },
  {
    id: 'actions',
  },
]
const data = ref<unknown[]>([])

function fetch() {
  client.listUser().then((res) => {
    data.value = res
  })
}

onMounted(() => {
  fetch()
})
</script>

<template>
  <div>
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
      <UTable :data="data" :columns="columns" class="flex-1">
        <template #actions-cell="{ row }">
          <UButton icon="i-icon-park-outline-delete" color="neutral" variant="subtle" @click="onDelete(row.original)" />
        </template>
      </UTable>
    </UCard>
  </div>
</template>
