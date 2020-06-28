import { Injectable } from "@angular/core";
import { LocalStorage } from "@ngx-pwa/local-storage";

interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: "root",
})
export class ServerSentEventService {
  private api = "http://localhost:4200/stream";
  private eventSource: EventSource;

  constructor(private localStorage: LocalStorage) {
    this.eventSource = new EventSource(this.api);
  }

  public listen(): void {
    this.eventSource.addEventListener("productAdd", (message: MessageEvent) =>
      this.addProductToCache(message)
    );
    this.eventSource.addEventListener(
      "productUpdate",
      (message: MessageEvent) => this.updateProductInCache(message)
    );
    this.eventSource.addEventListener(
      "productDelete",
      (message: MessageEvent) => this.deleteProductFromCache(message)
    );
  }

  private addProductToCache(eventMessage: MessageEvent): void {
    this.localStorage
      .getItem<Product[]>("products")
      .subscribe((products: Product[]) => {
        products = products || [];
        let eventMessageProduct: Product = JSON.parse(eventMessage.data);
        products.push(eventMessageProduct);

        this.localStorage.setItem("products", products);
      });
  }

  private updateProductInCache(eventMessage: MessageEvent): void {
    this.localStorage
      .getItem<Product[]>("products")
      .subscribe((products: Product[]) => {
        let eventMessageProduct: Product = JSON.parse(eventMessage.data);
        let productIndex = products.findIndex(
          (product) => product.id === eventMessageProduct.id
        );
        products[productIndex] = eventMessageProduct;

        this.localStorage.setItem("products", products);
      });
  }

  private deleteProductFromCache(eventMessage: MessageEvent): void {
    this.localStorage
      .getItem<Product[]>("products")
      .subscribe((products: Product[]) => {
        let eventMessageProduct: Product = JSON.parse(eventMessage.data);
        products = products.filter(
          (item) => item.id !== eventMessageProduct.id
        );

        this.localStorage.setItem("products", products);
      });
  }
}
