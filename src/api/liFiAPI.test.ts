import { beforeAll, describe, expect, test } from "vitest";
import { LIFI_API } from "../core/constants/config.const";
import { ChainType } from "../core/types/liFi.types";

const BEFORE_ALL_TIMEOUT = 20000;
const CHAIN_TYPES = "SVM";

type BodyType = {
  chains: ChainType[];
};

describe("Request li.fi api token list", () => {
  let response: Response;
  let body: BodyType;

  beforeAll(async () => {
    response = await fetch(`${LIFI_API}/chains?chainTypes=${CHAIN_TYPES}`);
    body = await response.json();
  }, BEFORE_ALL_TIMEOUT);

  test("Should have response status 200", () => {
    expect(response.status).toBe(200);
  });

  test("Should have content-type", () => {
    expect(response.headers.get("Content-Type")).toBe("application/json");
  });

  test("The first object in array to have key", () => {
    expect(body.chains[0].key).to.have.string("sol");
  });
});
