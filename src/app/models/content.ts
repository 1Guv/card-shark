export interface Content {
    header?: Header;
    homeCTA?: HomeCTA;
    // footer?: Footer;
    // createListing?: CreateListing;
    // search?: Search;
}

export interface Header {
    leftLogoUrl: string;
    middleLogoUrl: string;
    headerMenuOptions: Array<HeaderMenuOptions>;
}

export interface HeaderMenuOptions {
    name: string;
    icon: string;
    url: string;
    toolTip: string;
}

export interface HomeCTA {
    mainMessage: string;
    subMessage: string;
    registerButton: CTAButtons;
    calculateButton: CTAButtons;
    reviewButton: CTAButtons;
    howItWorks: Array<Section>;
}

export interface CTAButtons {
    name: string;
    url: string;
}

export interface Section {
    subTitle: string;
    title: string;
    paragraph: string;
    list: Array<List>;
    imageLeft: boolean;
    imageRight: boolean;
    imageUrl: string;
    ctaButtonText: string;
    ctaButtonUrl: string;
    ctaButtonSubText: string;
}

export interface List {
    listTitle: string;
    listIcon: string;
}
