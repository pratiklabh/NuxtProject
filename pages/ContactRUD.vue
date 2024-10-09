<template>
  <div>
    <!-- DataTable for displaying contact information -->
    <DataTable :value="contacts" showGridlines tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="subject" header="Subject"></Column>
      <Column field="message" header="Message"></Column>
      <Column header="Action">
        <template #body="slotProps">
          <Button @click="openEditDialog(slotProps.data)" class="mr-2">Edit</Button>
          <Button @click="deleteContact(slotProps.data.id)">Delete</Button>
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="showEditDialog" header="Edit Contact Details" :style="{ width: '25rem' }">
      <span class="text-surface-500 block mb-4">Update contact information.</span>

      <Form @submit="updateContact" v-slot="{ errors }">
        <div class="flex items-center gap-4 mb-4">
          <label for="name" class="font-semibold w-24">Name</label>
          <Field name="name" v-model="fields.name" rules="required">
            <InputText id="name" v-model="fields.name" placeholder="Name" class="flex-auto ml-2" />
          </Field>
          <ErrorMessage name="name" class="error" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="email" class="font-semibold w-24">Email</label>
          <Field name="email" v-model="fields.email" rules="required|email">
            <InputText id="email" v-model="fields.email" placeholder="Email" class="flex-auto ml-2" />
          </Field>
          <ErrorMessage name="email" class="error" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="subject" class="font-semibold w-24">Subject</label>
          <Field name="subject" v-model="fields.subject" rules="required">
            <Select id="subject" v-model="fields.subject" :options="subjects" optionLabel="label" optionValue="value" placeholder="Subject" class="flex-auto ml-2" />
          </Field>
          <ErrorMessage name="subject" class="error" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="message" class="font-semibold w-24">Message</label>
          <Field name="message" v-model="fields.message" rules="required">
            <InputText id="message" v-model="fields.message" placeholder="Message" class="flex-auto ml-2" />
          </Field>
          <ErrorMessage name="message" class="error" />
        </div>

        <div class="flex justify-content-center gap-3">
          <Button type="button" label="Cancel" severity="secondary" @click="closeEditDialog"></Button>
          <Button type="submit" label="Update"></Button>
        </div>
      </Form>
    </Dialog>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import { defineRule } from "vee-validate";
import { required, email } from "@vee-validate/rules";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';

defineRule("required", required);
defineRule("email", email);

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contacts = ref<Contact[]>([]);
const error = ref<string | null>(null);
const editedContact = ref<Contact | null>(null);
const showEditDialog = ref(false);
const fields = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});
const subjects = ref([
  { label: 'Subject 1', value: 'Subject 1' },
  { label: 'Subject 2', value: 'Subject 2' },
  { label: 'Subject 3', value: 'Subject 3' },
  { label: 'Subject 4', value: 'Subject 4' },
]);

const { handleSubmit, resetForm } = useForm();

const openEditDialog = (contact: Contact) => {
  editedContact.value = { ...contact };
  fields.value.name = contact.name;
  fields.value.email = contact.email;
  fields.value.subject = contact.subject;
  fields.value.message = contact.message;
  showEditDialog.value = true;
};

const closeEditDialog = () => {
  showEditDialog.value = false;
  resetForm();
};

const deleteContact = async (id: number) => {
  try {
    await $fetch(`/api/contacts/${id}`, { method: "DELETE" });
    contacts.value = contacts.value.filter(contact => contact.id !== id);
  } catch (err) {
    error.value = 'Failed to delete contact.';
  }
};

const updateContact = handleSubmit(async () => {
  if (editedContact.value) {
    try {
      await $fetch(`/api/contacts/${editedContact.value.id}`, {
        method: "PUT",
        body: fields.value
      });
      contacts.value = contacts.value.map(contact =>
          contact.id === editedContact.value!.id ? { ...editedContact.value, ...fields.value } : contact
      );
      closeEditDialog();
    } catch (err) {
      error.value = 'Failed to update contact.';
    }
  }
});

onMounted(async () => {
  try {
    const response = await $fetch('/api/contacts?start=0&end=5');
    console.log(response)
    contacts.value = response.result;
  } catch (err) {
    error.value = 'Failed to load contacts.';
  }
});
</script>

<style scoped>
.error {
  color: red;
  font-size: 1rem;
  margin-top: 0.5rem;
}
</style>
