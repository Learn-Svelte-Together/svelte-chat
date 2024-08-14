<script lang="ts">
	import { enhance } from '$app/forms';
    import { format } from 'date-fns';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
    let messages = $state(data.chatHistory);

	let chatHistory: HTMLElement;
    
    async function formatTimestamp(): Promise<string> {
        const unixEpoch = Math.floor(Date.now() / 1000);
        const date = new Date(unixEpoch * 1000);
        const formattedDate = format(date, 'dd/MM/yy HH:mm');
        return formattedDate;
    }

</script>

<main id="chat-app" class="flex flex-col gap-4 max-h-screen min-h-screen bg-[#FDF0E8] p-8">
    <h1 class=" text-xl">Melmac Chat</h1>
    <section id="chat-history" class="flex flex-col justify-end flex-grow overflow-y-auto no-scrollbar p-4 mx-auto max-w-[760px] w-full" bind:this={chatHistory}>
        <div class="flex flex-col">
          {#each messages as { username, message_timestamp, message }}
            <div class="flex flex-row gap-4 py-4">
              <div class="flex self-end">
                <img class="h-14 rounded-full" src="https://pyxis.nymag.com/v1/imgs/2f1/1c3/0b5b505aba34a55b6e8f8ea86f33b57ee6-01-alf-2.rsquare.w330.jpg" alt="user icon" /> <!--Placeholder until we have icon on auth-->
              </div>
              <article class="flex flex-col p-2 gap-2">
                <p class="text-xs text-slate-400">
                  <span>{username}&nbsp;&bull;&nbsp;</span><span>{message_timestamp}</span>
                </p>
                <p class="bg-[#E5BF70] rounded-t-lg rounded-br-lg px-4 py-2 text-[#29170c]">
                  <span>{message}</span>
                </p>
              </article>
            </div>
          {/each}
        </div>
      </section>
    <form 
        id="chat-input" 
        class="mx-auto max-w-[760px] w-full"
        method="POST" 
        action="?/newMessage" 
        use:enhance={({ formData }) => {
            
            return async ({result, update}) => {
                if (result.type === 'success') {
                    messages.push({
                        message: formData.get('message')!.toString(),
                        message_timestamp: await formatTimestamp(),
                        username: "Alf" //Hardcoded for now until we have auth
                    });
                    await update();
                    chatHistory.scroll({ top: chatHistory.scrollHeight, behavior: 'instant' });
                }
                
            }
        }}
    >
    <label class="rounded-b-md w-full relative">

        <!-- svelte-ignore a11y_autofocus-->
        <input
            id="message-input"
            class="w-full rounded-full p-4 bg-[#E5BF70] focus:border focus:border-[#703713] focus:outline-none focus:ring-0 outline-none placeholder:text-[#703713]"
            name="message"
            type="text"
            placeholder="Type your message..."
            autocomplete="off"
            autofocus
            required
        />

        <button type="submit" class="flex flex-col h-full absolute inset-y-0 right-4 items-center justify-center">
            <svg aria-hidden="true" viewBox="0 0 24 24" color="#E7B799" class="h-6 w-6 fill-[#703713]">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
        </button>

    </label>

    </form>
</main>