<script lang="ts">

    import { enhance } from '$app/forms';

    let { data } = $props();

    const scrollToBottom = async (node: HTMLElement) => {
        node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    };

    $effect(() => {
        data;
        const scrollableElement = document.getElementById('chat-history-wrapper');
        if (scrollableElement) {
            scrollToBottom(scrollableElement);
        };
    });

</script>
   
<div id="chat-container">
    
    <h1 id="chat-title">Minimal Chat App</h1>
    
    <div id="chat-history-wrapper">
        
        <!-- Iterate over message history and display each message -->
        <!-- ? An alternative here might be to have a simple message Component and import it -->
        {#each data.messageHistory as { username, message }}
            <div id="username">{username}:</div>
            <div id="message">{message}</div>
        {/each}
        
    </div>

    <div id="chat-input-wrapper">

        <form
            id="chat-input-form"
            method="POST"
            action="?/submitMessage"
            use:enhance
        >

            <!-- Hidden input for hardcoded username>
            <!-- TODO: Replace once user management strategy and tooling has been determined-->
            <input type="hidden" name="username" value="Me"/>
            
            <!-- Message input field -->
             <!-- svelte-ignore a11y_autofocus -->
            <input name="message" type="text" placeholder="Type your message..." autocomplete="off" autofocus required />

        </form>
    </div>
    

</div>

<!-- Bare minimum css included for usability -->
<!-- ? Do we want to use vanilla css in style or move to something like Tailwind? -->
<style>

    #chat-container {
        max-width: 800px;
        margin: auto;
    }

    #chat-title {
        padding: 15px;
        text-align: center;
    }

    #chat-history-wrapper {
        border: solid 2px rgb(171, 182, 192);
        padding: 20px;
        margin-bottom: 5px;
        min-height: 600px;
        max-height: 600px;
        overflow: scroll;
    }

    #chat-history-wrapper div:nth-child(odd) {
        font-weight: bold;
    }

    #chat-history-wrapper div:nth-child(even) {
        width: 100%;
        margin: auto;
        padding-bottom: 15px
    }

    #chat-input-form input[name="message"] {
        width:100%;
        box-sizing: border-box;
        padding: 10px;
        border: solid 2px rgb(171, 182, 192);
        font-size: 16px;
    }

    #chat-input-form input[name="message"]:focus {
        outline: gray solid 2px;
    }

</style>
