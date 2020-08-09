({
    addMessage: function (cmp, event, helper) {
        const msg = cmp.find("input").get("v.value");
        const messages = cmp.get("v.messages");
        messages.push({
            id: messages.length,
            value: msg,
            from: "AURA"
        });
        cmp.set("v.messages", messages);

        //publish value
        const messagePayload = {
            message: msg,
            from: "AURA"
        };
        const msgChannel = cmp.find("channel");
        msgChannel.publish(messagePayload);

        cmp.find("input").set("v.value", "");

    },

    msgHandler: function (cmp, evt, helper) {
        if (evt.getParam("from") !== 'AURA') {
            const msg = evt.getParam("message");
            const messages = cmp.get("v.messages");

            messages.push({
                id: messages.length,
                value: msg,
                from: "LWC"
            });
            cmp.set("v.messages", messages);
        }
    }
})