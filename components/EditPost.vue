<template>
  <div>
    <b-modal id="modal-prevent-closing" ref="modal" title="Edit" @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name required"
        >
          <b-form-input
            id="name-input"
            v-model="edit.name"
            aria-describedby="name-val"
            required
          ></b-form-input>
          <b-form-invalid-feedback id="name-val"
            >This is a required field</b-form-invalid-feedback
          >
        </b-form-group>
        <b-form-group
          label="Age"
          label-for="age-input"
          invalid-feedback="Age required"
        >
          <b-form-input
            id="age-input"
            v-model="edit.age"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Color"
          label-for="color-input"
          invalid-feedback="Color required"
        >
          <b-form-input
            id="color-input"
            v-model="edit.colour"
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

    // resetModal() {
    //   this.edit.name = "";
    //   this.edit.age = "";
    //   this.edit.colour = "";
    // },
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
      console.log(JSON.stringify(this.edit), "edit");
      axios
        .put(
          `https://crudcrud.com/api/c777d368f24f40e7b4810d8bb6e80838/unicorns/${this.edit._id}`,
          JSON.stringify(this.edit)
        )
        .then((res) => {
          if (res) {
            console.log(res.data);
            this.makeToast();
            // this.$store.dispatch("getPosts",res);
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
      this.$bvToast.toast(
        `Post with id ' ${this.edit._id} ' is edited successfully`,
        {
          variant: variant,
          solid: true,
        }
      );
    },
    errToast(variant = "danger") {
      this.$bvToast.toast("Post is not edited", {
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