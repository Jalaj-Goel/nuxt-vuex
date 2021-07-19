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
    <div v-if="posts.length > 1">
      <table border="1px">
        <thead>
          <td><b> Id </b></td>
          <td>Title</td>
          <td>Body</td>
          <td>Action</td>
        </thead>
        <tbody v-for="post in posts" :key="post.id">
          <td>
            {{ post.id }}
          </td>
          <td>
            {{ post.title }}
          </td>
          <td>{{ post.body }}</td>
          <td>
            <b-button-group>
              <b-button
                v-b-modal.modal-prevent-closing
                v-on:click="editPost(post.id)"
                variant="primary"
              >
                Edit
              </b-button>
              <b-button
                v-b-modal.modal-sm
                variant="danger"
                v-on:click="showDeleteModal(post.id)"
              >
                Delete
              </b-button>
            </b-button-group>
          </td>
        </tbody>
      </table>
      <div v-if="edit == true">
        <EditPost :edit="editP" @formData="owndata" :loading="loading" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EditPost from "./EditPost.vue";
import Loader from "./loader.vue";

export default {
  name: "UserTable",
  components: {
    EditPost,
    Loader,
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
      return this.$store.getters.getPost;
    },
  },

  created() {
    this.$store.dispatch("getPosts");
  },
  methods: {
    showDeleteModal(id) {
      this.$bvModal
        .msgBoxConfirm(`Are you sure you want to delete item ${id}?`, {
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Delete",
          cancelVariant: "primary",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value == true) {
            axios
              .delete("https://jsonplaceholder.typicode.com/posts/" + id)
              .then((res) => {
                this.makeToast("success", id);
                this.$store.state.posts.splice(id - 1, 1);
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
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => {
          this.editP = res.data;
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
  display: block;
  height: 500px;
  overflow-y: auto;
}
tr {
  width: 100%;
}
thead {
  position: sticky;
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
