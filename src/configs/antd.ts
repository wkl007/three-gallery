import { Avatar, Button, Card, ConfigProvider, List } from 'ant-design-vue'

export function useAntd (app: any): void {
  app
    .use(Avatar)
    .use(Button)
    .use(Card)
    .use(ConfigProvider)
    .use(List)
}
