<template>
  <div class="container mt-3">
    <h1>Add Posts</h1>
    <h6>
      <NuxtLink to="/">Back to Home</NuxtLink>
    </h6>
    <b-form @submit="submitForm" @reset="onReset">
      <b-form-group
        id="input-group-title"
        label="Title:"
        label-for="input-tite"
      >
        <b-form-input
          id="input-title"
          v-model="form.title"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-body" label="Body:" label-for="input-body">
        <b-form-input
          id="input-body"
          v-model="form.body"
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
        title: "",
        body: "",
      },
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      // axios
      //   .post("https://jsonplaceholder.typicode.com/posts", {
      //     title: this.form.title,
      //     body: this.form.body,
      //   })
      //   .then((res) => {
      //     // this.makeToast("success");
      //     // this.$store.state.posts.push(this.form);
      //   });
      this.$router.push({
        path: "/",
      });
    },
    onReset(event) {
      event.preventDefault();
      this.form.title = "";
      this.form.body = "";
    },
    // makeToast(variant = null) {
    //   this.$bvToast.toast("Item added to the list", {
    //     variant: variant,
    //     solid: true,
    //   });
    // },
  },
};
</script>
