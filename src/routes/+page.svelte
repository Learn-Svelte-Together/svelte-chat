<script>
    import { onMount } from 'svelte';
    import MessageCard from '../components/messageCard.svelte';
    
    import { addNewMessage } from '$lib/messageRoutines';
    
    onMount(() => {
      addNewMessage('Test message 1');
    })
    
</script> 

<h1 class="pageHeading">Me Chat</h1>
 
  <!-- <MessageCard />   -->

<MessageCard/> 

<style>
  
  * {
    padding: 0;
    margin-left: 30px;
  }
  
  .pageHeading {
    background-color: white;
    font: black;
    margin-bottom: 25px;
  }
  
  /* .pageContainer {
    height: 60vh;
    background-color: rgb(85, 28, 241) ;
  } */

  /* .chatContainer {
    background-color: blue;
    height: 80%;
    color: rgb(30, 191, 194);
    margin-bottom: 25px;
  } */

  /* .mesagesContainer {
    background-color: purple;
    height: 20%;
    color: #ce2232;
  }
   */
</style>
