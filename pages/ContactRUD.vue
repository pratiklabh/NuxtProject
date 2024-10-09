
<template>

  <div>
    <DataTable :value="contacts">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="subject" header="Subject"></Column>
      <Column field="message" header="Message"></Column>
      <Column header="Action">
        <template #body="slotProps">
          <Button>Edit</Button>
          <Button>Delete</Button>
        </template>
      </Column>
    </DataTable>


  </div>
</template>


<script setup lang="ts">
const contacts = ref<Contact[]>([]);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    console.log('onmounteddd');
    const response = await $fetch('/api/contacts?start=0&end=5');
    console.log(response)
    contacts.value = response.result;
    console.log(contacts.value);
  } catch (err) {
    error.value = 'Failed to load contacts.';
    console.error(err); // Log the error for debugging
  }
});

</script>

<style scoped>

</style>