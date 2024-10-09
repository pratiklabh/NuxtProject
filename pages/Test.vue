<template>
  <div>
    <h1>Hello World</h1>

    <Form @submit="handleSubmit">
      <div class="form-row mb-4">
        <label class="form-label" for="name">Name</label>
        <div class="form-field">
          <Field name="name" rules="required" v-slot="{ field }">
            <InputText id="name"
                       v-model="formData.name"
                       v-bind="field"
                       placeholder="Name"
            />
          </Field>
          <ErrorMessage name="name" class="error"/>
        </div>
      </div>

      <div class="form-row mb-4">
        <label class="form-label" for="email">Email</label>
        <div class="form-field">
          <Field name="email" rules="required" v-slot="{ field }">
            <InputText id="email"
                       v-model="formData.email"
                       v-bind="field"
                       placeholder="Email"
            />
          </Field>
          <ErrorMessage name="email" class="error"/>
        </div>
      </div>

      <div class="form-row mb-4">
        <label class="form-label" for="subject">Subject</label>
        <div class="form-field">
          <Field name="subject" rules="required" v-slot="{ field }">
            <Select id="subject"
                    v-model="formData.subject"
                    v-bind="field"
                    placeholder="Subject"
                    :options="subjects"
                    optionLabel="label"
                    optionValue="value"

            />
          </Field>
          <ErrorMessage name="subject" class="error"/>
        </div>
      </div>

      <div class="form-row mb-4">
        <label class="form-label" for="message">Message</label>
        <div class="form-field">
          <Field name="message" rules="required" v-slot="{ field }">
            <InputText id="message"
                       v-model="formData.message"
                       v-bind="field"
                       placeholder="message"
            />
          </Field>
          <ErrorMessage name="message" class="error"/>
        </div>
      </div>

      <div class="form-row">
        <Button type="submit"> Submit</Button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import {ErrorMessage, Field, Form} from "vee-validate";
import {defineRule} from "vee-validate";
import {required} from "@vee-validate/rules";

defineRule("required", required);

const subjects = ref([
  {label: 'Subject 1', value: 'Subject 1'},
  {label: 'Subject 2', value: 'Subject 2'},
  {label: 'Subject 3', value: 'Subject 3'},
  {label: 'Subject 4', value: 'Subject 4'},
])

const formData = ref({
  name:'',
  email:'',
  subject:'',
  message:''
})
const handleSubmit = async () => {
  try {
    const response = await $fetch('/api/contacts', {
      method: 'POST',
      body: formData.value
    });
    console.log('Success:', response);
  } catch (error) {
    console.error('Error:', error);
  }
};

</script>

<style>
.error {
  color: red;
  padding-left: 5px;
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.form-label {
  width: 120px;
}

.form-field {
  flex-grow: 1;
}
</style>
