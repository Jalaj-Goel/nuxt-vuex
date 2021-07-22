<template>
  <div class="container">
    <div
      v-if="loading == true"
      class="d-flex justify-content-center loading-page"
    >
      <div class="align-self-center">
        <b-spinner label="Spinning" variant="primary"></b-spinner>
      </div>
    </div>
    <h1>Table</h1>
    <div v-if="posts.length >= 1">
      <table border="1px">
        <thead>
          <td>Id</td>
          <td>Name</td>
          <td>Age</td>
          <td>Color</td>
          <td>Action</td>
        </thead>
        <tbody v-for="post in posts" :key="post._id">
          <td>
            {{ post._id }}
          </td>
          <td>
            {{ post.name }}
          </td>
          <td>{{ post.age }}</td>
          <td>{{ post.colour }}</td>
          <td>
            <b-button-group>
              <b-button
                v-b-modal.modal-prevent-closing
                v-on:click="editPost(post._id)"
                variant="primary"
              >
                Edit
              </b-button>
              <b-button
                v-b-modal.modal-sm
                variant="danger"
                v-on:click="showDeleteModal(post._id, post.name)"
              >
                Delete
              </b-button>
            </b-button-group>
          </td>
        </tbody>
      </table>
      <div v-if="edit == true">
        <EditPost :edit="editP" @formData="owndata" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EditPost from "./EditPost.vue";

export default {
  name: "UserTable",
  components: {
    EditPost,
  },
  data() {
    return {
      editP: [],
      edit: false,
      loading: true,
      deleteP: false,
    };
  },
  computed: {
    posts() {
      this.loading = false;
      const items = this.$store.getters.getPost;
      return items;
    },
  },

  created() {
    this.$store.dispatch("getPosts");
  },
  methods: {
    showDeleteModal(id, name) {
      this.loading = true;
      this.$bvModal
        .msgBoxConfirm(
          `Are you sure you want to delete item ${name}?`,
          {
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "Delete",
            cancelVariant: "primary",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          },
          (this.loading = false)
        )
        .then((value) => {
          if (value == true) {
            this.loading = true;
            axios
              .delete(
                `https://crudcrud.com/api/31cd0cc672c14499bdfe9db7fdf48d56/unicorns/${id}`
              )
              .then((res) => {
                this.makeToast("success", id);
                this.$store.dispatch("getPosts");
                this.loading = false;
              });
          }
        })
        .catch((err) => {
          // An error occurred
          console.error("error in delete", err);
        });
    },
    owndata(username) {},
    editPost(id) {
      this.edit = true;
      this.loading = true;
      axios
        .get(
          `https://crudcrud.com/api/31cd0cc672c14499bdfe9db7fdf48d56/unicorns/${id}`
        )
        .then((res) => {
          this.editP = res.data;
          this.loading = false;
        })
        .catch((err) => console.error(err));
    },
    makeToast(variant = null, id) {
      this.$bvToast.toast(`Post with id ' ${id} ' is deleted successfully`, {
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>

<style scoped>
table {
  margin-top: 17px;
  /* display: block; */
  /* height: 500px; */
  border: 1px solid #ccc;
  border-collapse: collapse;
  /* margin: 0; */
  padding: 0;
  width: 100%;
  /* table-layout: fixed; */
}
td {
  text-align: center;
}
thead {
  /* position: sticky; */
  padding: 0.625em;
  text-align: center;
  font-size: 1em;
  font-weight: bold;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
h1 {
  text-align: center;
}
.loading-page {
  z-index: 5000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
}
</style>
