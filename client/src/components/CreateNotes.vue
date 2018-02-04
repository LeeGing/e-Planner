<template>
  <div>
  <div>
    <v-layout column>
      <v-flex xs6 offset-xs3>
        <panel title="New Entry">
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field class="border-b1"
              required
              :rules="[required]"
              label="Enter Task Title"
              v-model="note.title"
            ></v-text-field>
            <br>
            <v-text-field
              label="Enter Description"
              v-model="note.description"
            ></v-text-field>
            <br>
            <!-- it would be nicer to have 3 input boxes for dd mm yy rather than self typing -->
             <v-text-field
              required
              :rules="[required]"
              label="Due Date - DD/MM/YY"
              v-model="note.duedate"
            ></v-text-field>
            <br>
            <v-btn class="cyan" @click="create" dark>Save</v-btn>
            <br>
            <div class="error"/>
          </div>
        </panel>
      </v-flex>
    </v-layout>
  </div>
</div>
</template>

<script>
import Panel from '@/components/Panel'
import NotesService from '@/services/NotesService'

export default {
  name: 'Registration',
  data () {
    return {
      note: {
        title: null,
        description: null,
        duedate: null
      },
      required: (value) => !!value || 'REQUIRED'
    }
  },
  components: {
    Panel
  },
  methods: {
    async create () {
      try {
        // send to backend
        await NotesService.post(this.note)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<!-- vuex will be used for key store related objects -->
