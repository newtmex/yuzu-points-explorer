import { ponder } from "ponder:registry";
import { graphql } from "ponder";

import yuzuSummary from "../../yuzuSummary";
import landAvailInfo from "../../landAvailInfo";

ponder.use("/graphql", graphql());
ponder.use("/", graphql());

ponder.get("land-avail-info", async (c) => {
    return c.json(await landAvailInfo(c.db));
});

ponder.get("/point-stats", async (c) => {
    return c.json(await yuzuSummary(c.db));
});
