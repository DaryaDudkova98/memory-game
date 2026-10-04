export function initMain() {
    const main = document.createElement("main");
    const wrapper = document.createElement("div");

    main.classList.add("main");
    wrapper.classList.add("wrapper");

    main.append(wrapper);
    document.body.append(main);

    return wrapper;
}