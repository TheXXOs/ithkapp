<!-- kept for school project reasons -->

<template>
  <div class="optionbox" :class="OBclass">
    <button style="float:right; margin-top: 5px; margin-right: 5px; display:inline" @click="this.$emit('modal',code)">?</button>
    <h3>{{title}}</h3>

    <!-- The following depends on which TYPE of grammar option this is: -->

    <!-- If it's a simple text entry: -->
    <input v-if="type=='text'" v-model="text" @input="this.$emit('send-message',text,code)" placeholder="Enter..." maxlength=4/>

    <!-- If it's a list of text entries: -->
    <div v-else-if="type=='affix'">
      <div v-for="(affix,index) in affixes" :key="affix"> <!-- For each affix/degree pair in the array "affixes", add a textbox and two dropdowns linked to each-->
        <input v-model="affixes[index][0]" @input="this.$emit('send-message',affixes,code)" placeholder="Enter..." maxlength=3/> <!-- Textbox -->
        <select v-model="affixes[index][1]" @input="this.$emit('send-message',affixes,code)" style="display:inline-block"> <!-- Dropdown 1 (Degree) -->
          <option v-for="num in Array(10).keys()" :key="(num+1)%10" :value="(num+1)%10">Deg. {{(num+1)%10}}</option>
        </select>
        <select v-model="affixes[index][2]" @input="this.$emit('send-message',affixes,code)" style="display:inline-block"> <!-- Dropdown 2 (Type) -->
          <option :value="1">Type-1</option>
          <option :value="2">Type-2</option>
          <option :value="3">Type-3</option>
        </select>
      </div>
      <input type="button" value="Add" @click="affixes.push(['',1,1]); this.$emit('send-message',affixes,code)"/> <!-- Button to add another affix -->
      <input type="button" value="Remove" @click="affixes.pop(); this.$emit('send-message',affixes,code)"/> <!-- Button to remove an affix -->
    </div>

    <!-- Otherwise, assume it's a dropdown list: -->
    <select v-else v-model="option" @change="this.$emit('send-message',option,code)" :disabled="disabled" :id="code">
      <option v-for="(opt, short) in options" :key="opt" :value="short">{{opt}} {{short === short.toString().toUpperCase() ? "("+short+")" : ""}}</option>
      <!-- above: show the long form of the option (opt), and IF the short form (short) is uppercase then show that in brackets as well -->
    </select>

    <p v-if='this.$props.type == "affix" && this.affixes.length != 0 && !this.affixes.every(function (e) {return e[0] != ""})'><b>ERROR:</b> Empty affixes</p> <!-- if there's an error, have text that says so -->
    <p v-else-if='this.$props.type == "text" && this.text == ""'><b>ERROR:</b> Empty root</p>
    <p v-else></p> <!-- This is here so that the padding works regardless of if there's a <p> element or not -->
  </div>
</template>

<script>

export default {
  name: 'OptionBox',
  props: {
    options: Object,
    title: String,
    code: String,
    type: String,
    disabled: Boolean
  },
  data() {
    return {
      text: "",
      option: null,
      affixes: [],
    }
  },
  computed: {
    OBclass() { // set class to error if the input is the default
      return {
        error: (this.$props.type == "affix" && this.affixes.length != 0 && !this.affixes.every(function (e) {return e[0] != ""})) || (this.$props.type == "text" && this.text == ""),
        disabledbox: this.disabled
      }
    }
  },
  mounted() {
    if (this.$props.type != "affix" && this.$props.type != "text"){
      document.getElementById(this.$props.code).selectedIndex = 0;
    }
  },
  methods: {
    updateValue(toUpdate) {
      if (this.$props.type != "affix" && this.$props.type != "text" && toUpdate in this.$props.options) {
        this.option = toUpdate;
        this.$emit('send-message',this.option,this.$props.code)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.optionbox {
  float: left;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  flex-grow: 1;
  /*flex-basis: 20vw;*/
  margin: 2px;
}
.error {
  border-color: red;
  color: red;
}
.disabledbox {
  border-color: black;
  background-color: silver;
  color: dimgray;
}
/*h3 {
  margin: 40px 0 0;
}*/
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
