# Context

If you are interested in using this in conjunction with [MCP Getgather](https://github.com/mcp-getgather/mcp-getgather), these instruction are to give a working example of ordering doordash using the HyperAgent CLI Wrapper.

## Instructions for Reordering DoorDash

1. Ensure that you have the MCP Getgather repository cloned and set up. Follow the instructions in the [MCP Getgather README](https://github.com/mcp-getgather/mcp-getgather).
2. Run MCP Inspector ($ npx @modelcontextprotocol/inspector) and connect to the running server
3. Run the doordash_get_orders tool. You will be given a hosted link to signin. Paste the link in your browser to authenticate. This uses getgather's core machinery -- not stagehand or any off the shelf browser automation. Copy the unique id for the link session as you'll need it in the next step (e.g. vw4yx6)
4. To ensure the state is updated, run the poll_signin tool and paste the code from the previous step into the argument for link_id. You should see the status as FINISHED in the response.
5. Now finally, run the code in this repository while pointing to the same user data directory as MCP Getgather. For example:

```npx ts-node run-agent.ts "1. Go to Orders page at https://www.doordash.com/orders. 2. Find the most recent order from McDonalds on the page, and click the 'Reorder' button, then you will be redirected to the page of the restaurant. 3. Click the red cart button on the top right corner of the page to open the cart. 4. Continue the process to place the order. Make sure choose delivery option and not pickup, and the delivery address is the same as the last order. 5. At the end, confirm the order is placed successfully." --user-data-dir="~/code/getgather/data/profiles/vw4yx6" --starting-page=https://www.doordash.com/orders

```
