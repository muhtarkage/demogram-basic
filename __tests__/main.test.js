describe("App", () => {
  test("App.INSTAGRAM_API_VERSION should be 'v1'", () => {
    expect(App.INSTAGRAM_API_VERSION).toBe("v1");
  });

  test("App.User should have primaryKey 'id'", () => {
    const user = App.User.create({ id: 1, username: "testUser" });
    expect(user.get("primaryKey")).toBe("id");
  });

  test("App.ImageCollection should have standard_resolution and low_resolution attributes", () => {
    const imageCollection = App.ImageCollection.create({
      standard_resolution: App.Image.create({ url: "standard.jpg" }),
      low_resolution: App.Image.create({ url: "low.jpg" }),
    });
    expect(imageCollection.get("standard_resolution.url")).toBe("standard.jpg");
    expect(imageCollection.get("low_resolution.url")).toBe("low.jpg");
  });

  test("App.MediaRecord should have primaryKey 'id' and createDateTime function", () => {
    const mediaRecord = App.MediaRecord.create({ id: 1, create_time: new Date() });
    expect(mediaRecord.get("primaryKey")).toBe("id");
    expect(mediaRecord.createDateTime()).toBeDefined();
  });

  test("App.POPULAR_QUERY should have endpoint 'media' and media_id 'popular'", () => {
    expect(App.POPULAR_QUERY.query.endpoint).toBe("media");
    expect(App.POPULAR_QUERY.query.media_id).toBe("popular");
  });

  test("App.mediaController should load popular content", () => {
    App.mediaController.loadPopular();
    expect(App.mediaController.get("content")).toBeDefined();
  });

  test("App.mediaController should open and close details view", () => {
    const item = App.MediaRecord.create({ id: 1 });
    App.mediaController.openDetails(item);
    expect(App.mediaController.get("detailsView")).toBeDefined();
    App.mediaController.closeDetails();
    expect(App.mediaController.get("detailsView")).toBeUndefined();
  });
});