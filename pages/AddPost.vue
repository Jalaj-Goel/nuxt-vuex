<template>
  <div class="container mt-3">
    <h1>Add Posts</h1>
    <h6>
      <NuxtLink to="/">Back to Home</NuxtLink>
    </h6>
    <b-form @submit="submitForm" @reset="onReset">
      <b-form-group id="input-group-name" label="Name:" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="form.name"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-age" label="Age:" label-for="input-age">
        <b-form-input id="input-age" v-model="form.age" required></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-colour"
        label="Colour:"
        label-for="input-colour"
      >
        <b-form-input
          id="input-colour"
          v-model="form.colour"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddPost",
  head: {
    title: "Add post",
  },
  data() {
    return {
      form: {
        name: "",
        age: "",
        colour: "",
      },
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      axios
        .post(
          "https://crudcrud.com/api/c777d368f24f40e7b4810d8bb6e80838/unicorns",
          {
            name: this.form.name,
            age: this.form.age,
            colour: this.form.colour,
          }
        )
        .then((res) => {
          this.makeToast("success");
          this.$store.state.posts.push(res.data);
        });
      this.$router.push({
        path: "/",
      });
    },
    onReset(event) {
      event.preventDefault();
      this.form.title = "";
      this.form.body = "";
    },
    makeToast(variant = null) {
      this.$bvToast.toast("Post is added to the table", {
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>
