<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Edit"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="title required"
        >
          <b-form-input
            id="title-input"
            v-model="edit.title"
            aria-describedby="title-val"
            required
          ></b-form-input>
          <b-form-invalid-feedback id="title-val"
            >This is a required field and must be at least 3
            characters.</b-form-invalid-feedback
          >
        </b-form-group>
        <b-form-group
          label="Body"
          label-for="body-input"
          invalid-feedback="Body required"
        >
          <b-form-input
            id="name-input"
            v-model="edit.body"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditPost",
  data() {
    return {
      nameState: null,
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      return valid;
    },

    resetModal() {
      this.edit.title = "";
      this.edit.body = "";
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.$emit("formData", this.edit);
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      axios
        .patch(`https://jsonplaceholder.typicode.com/posts/${this.edit.id}`, {
          ...this.edit,
        })
        .then((res) => {
          if (res) {
            this.makeToast();
          } else {
            this.errToast();
          }
        })
        .catch((err) => console.error(err, "err"));

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    makeToast(variant = "success") {
      this.$bvToast.toast("Toast is edited successfully", {
        // title: `Variant ${variant || 'default'}`,
        variant: variant,
        solid: true,
      });
    },
    errToast(variant = "danger") {
      this.$bvToast.toast("Toast is not edited", {
        // title: `Variant ${variant || 'default'}`,
        variant: variant,
        solid: true,
      });
    },
  },
  props: ["edit"],
  emits: {
    formData: (users) => {},
  },
};
</script>

<style>
</style>