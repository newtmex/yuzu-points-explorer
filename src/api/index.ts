import { ponder } from "ponder:registry";

import yuzuSummary from "../../yuzuSummary";
import landAvailInfo from "../../landAvailInfo";

ponder.get("/", async (c) => {
    return c.json(await landAvailInfo(c.db));
});

ponder.get("/point-stats", async (c) => {
    return c.json(await yuzuSummary(c.db));
});
