import { withFindListings, WithFindListings } from "@abb/controller";
import { Card } from "antd";
import * as React from "react";

const { Meta } = Card;

export class C extends React.PureComponent<WithFindListings> {
  render() {
    const { listings, loading } = this.props;
    return (
      <div>
        {loading && <div>...Loading</div>}
        {listings.map(listing => (
          <Card
            key={`${listing.id}-card`}
            hoverable={true}
            style={{ width: 240 }}
            cover={
              listing.pictureUrl && (
                <img alt={listing.description} src={listing.pictureUrl} />
              )
            }
          >
            <Meta title={listing.name} description={listing.description} />
          </Card>
        ))}
      </div>
    );
  }
}

export const FindListingsConnector = withFindListings(C);
