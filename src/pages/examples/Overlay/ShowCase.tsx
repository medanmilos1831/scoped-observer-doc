import React from 'react';
import { overlayManager } from './overlayManager/OverlayManager';
import { OverlayController } from './overlayManager/OverlayController';
import { Modal } from './modal';
import { Drawer } from './drawer';
import { Row, Space, Button } from 'antd';

const ShowCase = () => {
  return (
    <div className="text-white mb-6">
      <OverlayController scope="modal" eventName="modalOne">
        {({ data, off, status }) => (
          <Modal
            modalName="modalOne"
            modalProps={(data: any) => ({
              title: data?.id ? 'Item Available' : 'No Item',
            })}
          >
            <>Some Content</>
          </Modal>
        )}
      </OverlayController>
      <OverlayController scope="drawer" eventName="drawerOne">
        {({ data, off, status }) => (
          <Drawer drawerName="drawerOne">
            <>Some Content</>
          </Drawer>
        )}
      </OverlayController>
      <Row>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              overlayManager('modal').on('modalOne');
            }}
          >
            Open Modal
          </Button>

          <br />

          <Button
            type="primary"
            onClick={() => {
              overlayManager('drawer').on('drawerOne', {
                id: 'some-id',
              });
            }}
          >
            Open Drawer
          </Button>
        </Space>
      </Row>
    </div>
  );
};

export default ShowCase;
